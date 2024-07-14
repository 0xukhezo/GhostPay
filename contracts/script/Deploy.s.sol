// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Utils, console} from "./Utils.s.sol";
import {NFCPaymasterFactory} from "src/NFCPaymasterFactory.sol";
import {IEntryPoint} from "src/interfaces/IEntryPoint.sol";
import {ISelfKisser} from "src/interfaces/ISelfKisser.sol";


contract GhostPayScript is Utils {
    address public entrypoint;
    address public selfKisser;


    function setUp() public {
        (entrypoint, selfKisser) = getDeployConfig();
    }

    function run() public {
        vm.startBroadcast();

        NFCPaymasterFactory factory = new NFCPaymasterFactory(selfKisser);

        string memory configPath = getJsonConfigPath();
        vm.writeJson(vm.toString(address(factory)), configPath, ".FACTORY");

        vm.stopBroadcast();
    }

    function getDeployConfig() public view returns (address entryPoint_, address selfKisser_) {
        entryPoint_ = getAddressFromConfigJson(".ENTRYPOINT");
        selfKisser_ = getAddressFromConfigJson(".SELF_KISSER");
    }
}
