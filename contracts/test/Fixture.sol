// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console2, Vm} from "forge-std/Test.sol";
import {Utils} from "script/Utils.s.sol";
import {ISelfKisser} from "src/interfaces/ISelfKisser.sol";
import {NFCPaymasterFactory} from "src/NFCPaymasterFactory.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {IEntryPoint} from "src/interfaces/IEntryPoint.sol";


contract Fixture is Test, Utils {

    address public entrypoint;
    address public selfKisser;
    NFCPaymasterFactory factory;
    ERC20Mock public mockERC20;

    constructor() {
        entrypoint = getAddressFromConfigJson(".ENTRYPOINT");
        selfKisser = getAddressFromConfigJson(".SELF_KISSER");
        factory = new NFCPaymasterFactory(IEntryPoint(entrypoint), 30000, ISelfKisser(selfKisser), 2 * 24 * 60 * 60);
        mockERC20 = new ERC20Mock();
    }
}
