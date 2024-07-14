// SPDX-License-Identifier: MIT

import {IPaymaster, UserOperation} from "src/interfaces/IPaymaster.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IChronicle} from "./interfaces/IChronicle.sol";
import {ISelfKisser} from "./interfaces/ISelfKisser.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "./utils/SafeTransferLib.sol";



contract NFCPaymaster is IPaymaster, Ownable {

    error OraclePriceNotPositive();

    event MarkupUpdated(uint32 priceMarkup);
    event UserOperationSponsored(
        bytes32 indexed userOpHash, address indexed user, uint256 tokenAmountPaid, uint256 tokenPrice
    );

    bytes4 constant EXECUTE_USER_OP_SELECTOR = 0x7bb37428; //Execute user op
    bytes4 constant APPROVE_SELECTOR = 0x095ea7b3;
    uint256 public constant PRICE_DENOMINATOR = 1e6;


    IERC20 public immutable token;
    uint256 public immutable tokenDecimals;
    IChronicle public immutable tokenOracle;
    IChronicle public immutable nativeAssetOracle;
    uint32 public immutable priceMarkupLimit;
    uint32 public priceMarkup;

    constructor(
        address _token,
        address _tokenOracle,
        address _nativeAssetOracle,
        address _owner,
        uint32 _priceMarkupLimit,
        uint32 _priceMarkup,
        address _selfKisser
    ) Ownable(_owner) {
        token = IERC20(_token);
        tokenOracle = IChronicle(_tokenOracle);                 // oracle for token -> usd
        nativeAssetOracle = IChronicle(_nativeAssetOracle);     // oracle for native asset(eth/matic/avax..) -> usd
        priceMarkupLimit = _priceMarkupLimit;
        priceMarkup = _priceMarkup;
        tokenDecimals = 10 ** IERC20Metadata(_token).decimals();

        // This allows the contract to read from the chronicle oracle.
        ISelfKisser(_selfKisser).selfKiss(address(_tokenOracle));
        ISelfKisser(_selfKisser).selfKiss(address(_nativeAssetOracle));
    }
    
    function validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash, uint256 maxCost
    )
        external
        override
        returns (bytes memory context, uint256 validationData)
    {
         if(!_isApprove(userOp)) {
            uint256 tokenPrice = getPrice();

            uint256 tokenAmount = maxCost* priceMarkup * tokenPrice / (1e18 * PRICE_DENOMINATOR);

            SafeTransferLib.safeTransferFrom(address(token), userOp.sender, address(this), tokenAmount);
            context = abi.encodePacked(tokenAmount, tokenPrice, userOp.sender, userOpHash);
        }

        context = new bytes(0);
        validationData = 0;
    }

    function _isApprove(UserOperation calldata userOp) internal returns(bool) {
        if (bytes4(userOp.callData[:4]) == EXECUTE_USER_OP_SELECTOR){
            (address to, uint256 value, bytes memory data, uint8 operation) = abi.decode(userOp.callData[4:], (address, uint256, bytes, uint8));
            return this._isApproveToPaymaster(data);
        }
        return false;
    }

    function _isApproveToPaymaster(bytes calldata approveData) public returns(bool){
        if (bytes4(approveData[:4]) == APPROVE_SELECTOR){
            (address paymaster, uint256 value) = abi.decode(approveData[4:], (address, uint256));
            return paymaster == address(this);
        }
        return false;
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) external override {
        if(context.length > 0) {
            uint256 prefundTokenAmount = uint256(bytes32(context[0:32]));
            uint256 tokenPrice = uint256(bytes32(context[32:64]));
            address sender = address(bytes20(context[64:84]));
            bytes32 userOpHash = bytes32(context[84:116]);

            uint256 actualTokenNeeded = actualGasCost * priceMarkup
                * tokenPrice / (1e18 * 1e18);

            SafeTransferLib.safeTransfer(address(token), sender, prefundTokenAmount - actualTokenNeeded);
            emit UserOperationSponsored(userOpHash, sender, actualTokenNeeded, tokenPrice);
        }
    }


    function updateMarkup(uint32 _priceMarkup) external onlyOwner {
        priceMarkup = _priceMarkup;
        emit MarkupUpdated(_priceMarkup);
    }

    function withdrawToken(address to, uint256 amount) external onlyOwner {
        SafeTransferLib.safeTransfer(address(token), to, amount);
    }

    function getPrice() public view returns (uint256) {
        uint256 tokenPrice = _fetchPrice(tokenOracle);
        uint256 nativeAssetPrice = _fetchPrice(nativeAssetOracle);
        uint256 price = nativeAssetPrice * tokenDecimals / tokenPrice;

        return price;
    }

    function _fetchPrice(IChronicle _oracle) internal view returns (uint256) {
        (uint256 answer,) = _oracle.readWithAge();
        if (answer <= 0) {
            revert OraclePriceNotPositive();
        }
        return answer;
    }
}
