// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {BasePaymaster} from "@account-abstraction/contracts/core/BasePaymaster.sol";
import {IEntryPoint} from "@account-abstraction/contracts/core/EntryPoint.sol";
import {_packValidationData} from "@account-abstraction/contracts/core/Helpers.sol";
import {UserOperationLib} from "@account-abstraction/contracts/core/UserOperationLib.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IChronicle} from "./interfaces/IChronicle.sol";
import {SafeTransferLib} from "./utils/SafeTransferLib.sol";
import {ISelfKisser} from "./interfaces/ISelfKisser.sol";

using UserOperationLib for PackedUserOperation;

contract NFCPaymaster is BasePaymaster {
    error PriceMarkupTooHigh();
    error PriceMarkupTooLow();
    error OraclePriceStale();
    error OraclePriceNotPositive();

    event MarkupUpdated(uint32 priceMarkup);
    event UserOperationSponsored(
        bytes32 indexed userOpHash, address indexed user, uint256 tokenAmountPaid, uint256 tokenPrice
    );

    bytes4 constant EXECUTE_USER_OP_SELECTOR = 0x3c46a185;
    bytes4 constant APPROVE_SELECTOR = 0x095ea7b3;
    uint256 public constant PRICE_DENOMINATOR = 1e6;

    uint256 public immutable refundPostOpCost;
    IERC20 public immutable token;
    uint256 public immutable tokenDecimals;
    IChronicle public immutable tokenOracle;
    IChronicle public immutable nativeAssetOracle;
    uint32 public immutable stalenessThreshold;
    uint32 public immutable priceMarkupLimit;
    uint32 public priceMarkup;

    constructor(
        IERC20Metadata _token,
        IEntryPoint _entryPoint,
        IChronicle _tokenOracle,
        IChronicle _nativeAssetOracle,
        uint32 _stalenessThreshold,
        address _owner,
        uint32 _priceMarkupLimit,
        uint32 _priceMarkup,
        uint256 _refundPostOpCost,
        ISelfKisser _selfKisser
    ) BasePaymaster(_entryPoint) {
        token = _token;
        tokenOracle = _tokenOracle; // oracle for token -> usd
        nativeAssetOracle = _nativeAssetOracle; // oracle for native asset(eth/matic/avax..) -> usd
        stalenessThreshold = _stalenessThreshold;
        priceMarkupLimit = _priceMarkupLimit;
        priceMarkup = _priceMarkup;
        refundPostOpCost = _refundPostOpCost;
        transferOwnership(_owner);
        tokenDecimals = 10 ** _token.decimals();

        // This allows the contract to read from the chronicle oracle.
        _selfKisser.selfKiss(address(_tokenOracle));
        _selfKisser.selfKiss(address(_nativeAssetOracle));

        if (_priceMarkup < 1e6) {
            revert PriceMarkupTooLow();
        }
        if (_priceMarkup > _priceMarkupLimit) {
            revert PriceMarkupTooHigh();
        }

    }

    function _validatePaymasterUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost)
        internal
        override
        returns (bytes memory context, uint256 validationResult)
    {

        if(!_isApprove(userOp)) {
            uint256 tokenPrice = getPrice();
            uint256 maxFeePerGas = UserOperationLib.unpackMaxFeePerGas(userOp);

            uint256 tokenAmount =
                (maxCost + (refundPostOpCost) * maxFeePerGas) * priceMarkup * tokenPrice / (1e18 * PRICE_DENOMINATOR);

            SafeTransferLib.safeTransferFrom(address(token), userOp.sender, address(this), tokenAmount);
            context = abi.encodePacked(tokenAmount, tokenPrice, userOp.sender, userOpHash);
            validationResult = 0;
        }
    }

    function _isApprove(PackedUserOperation calldata userOp) internal view returns(bool) {

        if (bytes4(userOp.callData[:4]) == EXECUTE_USER_OP_SELECTOR){
            (address to,,bytes memory data,) = abi.decode(userOp.callData[4:], (address, uint256, bytes, uint8));
            
            if(to == address(token) && bytes4(data) == APPROVE_SELECTOR){
                (, address spender,) = abi.decode(data, (bytes4, address, uint256));
                return spender == address(this);
            }
        }
        return false;
    }

    function _postOp(PostOpMode, bytes calldata context, uint256 actualGasCost, uint256 actualUserOpFeePerGas)
        internal
        override
    {
        uint256 prefundTokenAmount = uint256(bytes32(context[0:32]));
        uint256 tokenPrice = uint256(bytes32(context[32:64]));
        address sender = address(bytes20(context[64:84]));
        bytes32 userOpHash = bytes32(context[84:116]);

        uint256 actualTokenNeeded = (actualGasCost + refundPostOpCost * actualUserOpFeePerGas) * priceMarkup
            * tokenPrice / (1e18 * PRICE_DENOMINATOR);

        SafeTransferLib.safeTransfer(address(token), sender, prefundTokenAmount - actualTokenNeeded);
        emit UserOperationSponsored(userOpHash, sender, actualTokenNeeded, tokenPrice);
    }

    function updateMarkup(uint32 _priceMarkup) external onlyOwner {
        if (_priceMarkup < 1e6) {
            revert PriceMarkupTooLow();
        }
        if (_priceMarkup > priceMarkupLimit) {
            revert PriceMarkupTooHigh();
        }
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
        (uint256 answer, uint256 updatedAt) = _oracle.readWithAge();
        if (answer <= 0) {
            revert OraclePriceNotPositive();
        }
        if (updatedAt < block.timestamp - stalenessThreshold) {
            revert OraclePriceStale();
        }
        return answer;
    }
}
