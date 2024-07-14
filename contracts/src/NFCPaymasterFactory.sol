// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {NFCPaymaster} from "./NFCPaymaster.sol";
import {IEntryPoint} from "src/interfaces/IEntryPoint.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IChronicle} from "./interfaces/IChronicle.sol";

contract NFCPaymasterFactory {

    event NewPaymaster(address indexed paymaster, address indexed owner, address indexed token, uint32 priceMarkup);

    address public selfKisser;

    constructor(address _selfKisser){
        selfKisser = _selfKisser;
    }

    function deploy(
        address _token,
        address _tokenOracle,
        address _nativeAssetOracle,
        address _owner,
        uint32 _priceMarkupLimit,
        uint32 _priceMarkup
    ) public returns(address){
        NFCPaymaster paymaster = new NFCPaymaster(
            _token,
            _tokenOracle,
            _nativeAssetOracle,
            _owner,
            _priceMarkupLimit,
            _priceMarkup,
            selfKisser
        );

        emit NewPaymaster(address(paymaster), _owner, _token, _priceMarkup);

        return address(paymaster);
    }

}