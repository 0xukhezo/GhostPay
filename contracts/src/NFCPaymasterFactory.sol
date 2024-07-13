// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {NFCPaymaster} from "./NFCPaymaster.sol";
import {IEntryPoint} from "@account-abstraction/contracts/core/EntryPoint.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IChronicle} from "./interfaces/IChronicle.sol";
import {ISelfKisser} from "./interfaces/ISelfKisser.sol";

contract NFCPaymasterFactory {

    event NewPaymaster(address indexed paymaster, address indexed owner, address indexed token, uint32 priceMarkup);

    IEntryPoint public entryPoint;
    ISelfKisser public selfKisser;
    uint256 public refundPostOpCost;
    uint32 public stalenessThreshold;

    constructor(IEntryPoint _entryPoint, uint256 _refundPostOpCost, ISelfKisser _selfKisser, uint32 _stalenessThreshold){
        entryPoint = _entryPoint;
        refundPostOpCost = _refundPostOpCost;
        selfKisser = _selfKisser;
        stalenessThreshold = _stalenessThreshold;
    }

    function deploy(IERC20Metadata _token,
        IChronicle _tokenOracle,
        IChronicle _nativeAssetOracle,
        address _owner,
        uint32 _priceMarkupLimit,
        uint32 _priceMarkup
    ) public {
        NFCPaymaster paymaster = new NFCPaymaster(
            _token,
            entryPoint,
            _tokenOracle,
            _nativeAssetOracle,
            stalenessThreshold,
            _owner,
            _priceMarkupLimit,
            _priceMarkup,
            refundPostOpCost,
            selfKisser
        );

        emit NewPaymaster(address(paymaster), _owner, address(_token), _priceMarkup);
    }

}