// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class MarkupUpdated extends ethereum.Event {
  get params(): MarkupUpdated__Params {
    return new MarkupUpdated__Params(this);
  }
}

export class MarkupUpdated__Params {
  _event: MarkupUpdated;

  constructor(event: MarkupUpdated) {
    this._event = event;
  }

  get priceMarkup(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UserOperationSponsored extends ethereum.Event {
  get params(): UserOperationSponsored__Params {
    return new UserOperationSponsored__Params(this);
  }
}

export class UserOperationSponsored__Params {
  _event: UserOperationSponsored;

  constructor(event: UserOperationSponsored) {
    this._event = event;
  }

  get userOpHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenAmountPaid(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get tokenPrice(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class GhostPaymaster__validatePaymasterUserOpResult {
  value0: Bytes;
  value1: BigInt;

  constructor(value0: Bytes, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBytes(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getContext(): Bytes {
    return this.value0;
  }

  getValidationData(): BigInt {
    return this.value1;
  }
}

export class GhostPaymaster__validatePaymasterUserOpInputUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get initCode(): Bytes {
    return this[2].toBytes();
  }

  get callData(): Bytes {
    return this[3].toBytes();
  }

  get callGasLimit(): BigInt {
    return this[4].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[5].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxFeePerGas(): BigInt {
    return this[7].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[8].toBigInt();
  }

  get paymasterAndData(): Bytes {
    return this[9].toBytes();
  }

  get signature(): Bytes {
    return this[10].toBytes();
  }
}

export class GhostPaymaster extends ethereum.SmartContract {
  static bind(address: Address): GhostPaymaster {
    return new GhostPaymaster("GhostPaymaster", address);
  }

  PRICE_DENOMINATOR(): BigInt {
    let result = super.call(
      "PRICE_DENOMINATOR",
      "PRICE_DENOMINATOR():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_PRICE_DENOMINATOR(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "PRICE_DENOMINATOR",
      "PRICE_DENOMINATOR():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPrice(): BigInt {
    let result = super.call("getPrice", "getPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPrice", "getPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nativeAssetOracle(): Address {
    let result = super.call(
      "nativeAssetOracle",
      "nativeAssetOracle():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_nativeAssetOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "nativeAssetOracle",
      "nativeAssetOracle():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  priceMarkup(): BigInt {
    let result = super.call("priceMarkup", "priceMarkup():(uint32)", []);

    return result[0].toBigInt();
  }

  try_priceMarkup(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("priceMarkup", "priceMarkup():(uint32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  priceMarkupLimit(): BigInt {
    let result = super.call(
      "priceMarkupLimit",
      "priceMarkupLimit():(uint32)",
      [],
    );

    return result[0].toBigInt();
  }

  try_priceMarkupLimit(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "priceMarkupLimit",
      "priceMarkupLimit():(uint32)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokenDecimals(): BigInt {
    let result = super.call("tokenDecimals", "tokenDecimals():(uint256)", []);

    return result[0].toBigInt();
  }

  try_tokenDecimals(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenDecimals",
      "tokenDecimals():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOracle(): Address {
    let result = super.call("tokenOracle", "tokenOracle():(address)", []);

    return result[0].toAddress();
  }

  try_tokenOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall("tokenOracle", "tokenOracle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  validatePaymasterUserOp(
    userOp: GhostPaymaster__validatePaymasterUserOpInputUserOpStruct,
    userOpHash: Bytes,
    maxCost: BigInt,
  ): GhostPaymaster__validatePaymasterUserOpResult {
    let result = super.call(
      "validatePaymasterUserOp",
      "validatePaymasterUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256):(bytes,uint256)",
      [
        ethereum.Value.fromTuple(userOp),
        ethereum.Value.fromFixedBytes(userOpHash),
        ethereum.Value.fromUnsignedBigInt(maxCost),
      ],
    );

    return new GhostPaymaster__validatePaymasterUserOpResult(
      result[0].toBytes(),
      result[1].toBigInt(),
    );
  }

  try_validatePaymasterUserOp(
    userOp: GhostPaymaster__validatePaymasterUserOpInputUserOpStruct,
    userOpHash: Bytes,
    maxCost: BigInt,
  ): ethereum.CallResult<GhostPaymaster__validatePaymasterUserOpResult> {
    let result = super.tryCall(
      "validatePaymasterUserOp",
      "validatePaymasterUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256):(bytes,uint256)",
      [
        ethereum.Value.fromTuple(userOp),
        ethereum.Value.fromFixedBytes(userOpHash),
        ethereum.Value.fromUnsignedBigInt(maxCost),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GhostPaymaster__validatePaymasterUserOpResult(
        value[0].toBytes(),
        value[1].toBigInt(),
      ),
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tokenOracle(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _nativeAssetOracle(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _owner(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _priceMarkupLimit(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _priceMarkup(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _selfKisser(): Address {
    return this._call.inputValues[6].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class PostOpCall extends ethereum.Call {
  get inputs(): PostOpCall__Inputs {
    return new PostOpCall__Inputs(this);
  }

  get outputs(): PostOpCall__Outputs {
    return new PostOpCall__Outputs(this);
  }
}

export class PostOpCall__Inputs {
  _call: PostOpCall;

  constructor(call: PostOpCall) {
    this._call = call;
  }

  get mode(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get context(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get actualGasCost(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class PostOpCall__Outputs {
  _call: PostOpCall;

  constructor(call: PostOpCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateMarkupCall extends ethereum.Call {
  get inputs(): UpdateMarkupCall__Inputs {
    return new UpdateMarkupCall__Inputs(this);
  }

  get outputs(): UpdateMarkupCall__Outputs {
    return new UpdateMarkupCall__Outputs(this);
  }
}

export class UpdateMarkupCall__Inputs {
  _call: UpdateMarkupCall;

  constructor(call: UpdateMarkupCall) {
    this._call = call;
  }

  get _priceMarkup(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateMarkupCall__Outputs {
  _call: UpdateMarkupCall;

  constructor(call: UpdateMarkupCall) {
    this._call = call;
  }
}

export class ValidatePaymasterUserOpCall extends ethereum.Call {
  get inputs(): ValidatePaymasterUserOpCall__Inputs {
    return new ValidatePaymasterUserOpCall__Inputs(this);
  }

  get outputs(): ValidatePaymasterUserOpCall__Outputs {
    return new ValidatePaymasterUserOpCall__Outputs(this);
  }
}

export class ValidatePaymasterUserOpCall__Inputs {
  _call: ValidatePaymasterUserOpCall;

  constructor(call: ValidatePaymasterUserOpCall) {
    this._call = call;
  }

  get userOp(): ValidatePaymasterUserOpCallUserOpStruct {
    return changetype<ValidatePaymasterUserOpCallUserOpStruct>(
      this._call.inputValues[0].value.toTuple(),
    );
  }

  get userOpHash(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get maxCost(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ValidatePaymasterUserOpCall__Outputs {
  _call: ValidatePaymasterUserOpCall;

  constructor(call: ValidatePaymasterUserOpCall) {
    this._call = call;
  }

  get context(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }

  get validationData(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class ValidatePaymasterUserOpCallUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get initCode(): Bytes {
    return this[2].toBytes();
  }

  get callData(): Bytes {
    return this[3].toBytes();
  }

  get callGasLimit(): BigInt {
    return this[4].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[5].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxFeePerGas(): BigInt {
    return this[7].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[8].toBigInt();
  }

  get paymasterAndData(): Bytes {
    return this[9].toBytes();
  }

  get signature(): Bytes {
    return this[10].toBytes();
  }
}

export class WithdrawTokenCall extends ethereum.Call {
  get inputs(): WithdrawTokenCall__Inputs {
    return new WithdrawTokenCall__Inputs(this);
  }

  get outputs(): WithdrawTokenCall__Outputs {
    return new WithdrawTokenCall__Outputs(this);
  }
}

export class WithdrawTokenCall__Inputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawTokenCall__Outputs {
  _call: WithdrawTokenCall;

  constructor(call: WithdrawTokenCall) {
    this._call = call;
  }
}
