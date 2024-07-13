// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Fixture} from "./Fixture.sol";
import {NFCPaymasterFactory} from "src/NFCPaymasterFactory.sol";
import {NFCPaymaster} from "src/NFCPaymaster.sol";
import {IEntryPoint} from "src/interfaces/IEntryPoint.sol";
import {IERC20Metadata, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IChronicle} from "src/interfaces/IChronicle.sol";
import {ISelfKisser} from "src/interfaces/ISelfKisser.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {SimpleAccountFactory, SimpleAccount} from "@account-abstraction/contracts/samples/SimpleAccountFactory.sol";
import "./utils/TestCounter.sol";

contract PaymasterTest is Fixture {
    address public user1 = address(0x0Af6A440acE5b6cB8c5962F1B7A4503e66129873);
    uint256 userKey1;
    address user;

    SimpleAccountFactory accountFactory;
    SimpleAccount account;
    address payable beneficiary;
    TestCounter counter;


    function setUp() public {
        accountFactory = new SimpleAccountFactory(IEntryPoint(entrypoint));
        (user1, userKey1) = makeAddrAndKey("user");
        beneficiary = payable(makeAddr("beneficiary"));
        account = accountFactory.createAccount(user1, 0);
        counter = new TestCounter();
    }

    function testPrueba() public {
        IERC20Metadata token = IERC20Metadata(address(mockERC20));
        IChronicle tokenOracle = IChronicle(
            0x8E947Ea7D5881Cd600Ace95F1201825F8C708844
        );
        IChronicle nativeAssetOracle = IChronicle(
            0xea347Db6ef446e03745c441c17018eF3d641Bc8f
        );
        uint32 priceMarkupLimit = 120e4;
        uint32 priceMarkup = 100e4;

        address paymaster = factory.deploy(
            token,
            tokenOracle,
            nativeAssetOracle,
            user1,
            priceMarkupLimit,
            priceMarkup
        );

        vm.deal(user1, 1000e18);
        vm.startPrank(user1);
        IEntryPoint(entrypoint).depositTo{value: 100e18}(paymaster);
        NFCPaymaster(paymaster).addStake{value: 100e18}(1);
        vm.stopPrank();
        vm.warp(1680509051);

        PackedUserOperation memory op = fillUserOp(
            account,
            userKey1,
            address(counter),
            0,
            abi.encodeWithSelector(TestCounter.count.selector)
        );
        op.signature = signUserOp(op, userKey1);
        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = op;
        IEntryPoint(entrypoint).handleOps(ops, beneficiary);
    }

    function fillUserOp(
        SimpleAccount _sender,
        uint256 _key,
        address _to,
        uint256 _value,
        bytes memory _data
    ) public view returns (PackedUserOperation memory op) {
        op.sender = address(_sender);
        op.nonce = IEntryPoint(entrypoint).getNonce(address(_sender), 0);
        op.callData = abi.encodeWithSelector(
            SimpleAccount.execute.selector,
            _to,
            _value,
            _data
        );
        op.accountGasLimits = bytes32(
            abi.encodePacked(bytes16(uint128(80000)), bytes16(uint128(50000)))
        );
        op.preVerificationGas = 50000;
        op.gasFees = bytes32(
            abi.encodePacked(
                bytes16(uint128(100)),
                bytes16(uint128(1000000000))
            )
        );
        op.signature = signUserOp(op, _key);
        return op;
    }

    function signUserOp(PackedUserOperation memory op, uint256 _key) public view returns (bytes memory signature) {
        bytes32 hash = IEntryPoint(entrypoint).getUserOpHash(op);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(_key, MessageHashUtils.toEthSignedMessageHash(hash));
        signature = abi.encodePacked(r, s, v);
    }
}
