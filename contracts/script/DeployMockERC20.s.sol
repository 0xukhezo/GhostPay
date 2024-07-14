// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

//import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {ERC20Mock} from "src/ERC20Mock.sol";
import {Utils, console} from "./Utils.s.sol";

contract ERC20MockDeploy is Utils {
   
    function setUp() public {
        
    }

    function run() public {
        vm.startBroadcast();

        ERC20Mock mock = new ERC20Mock();
        console.log(address(mock));
       
        vm.stopBroadcast();
    }
}
