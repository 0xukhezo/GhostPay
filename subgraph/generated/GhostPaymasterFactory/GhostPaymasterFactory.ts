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

export class NewPaymaster extends ethereum.Event {
  get params(): NewPaymaster__Params {
    return new NewPaymaster__Params(this);
  }
}

export class NewPaymaster__Params {
  _event: NewPaymaster;

  constructor(event: NewPaymaster) {
    this._event = event;
  }

  get paymaster(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get priceMarkup(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class GhostPaymasterFactory extends ethereum.SmartContract {
  static bind(address: Address): GhostPaymasterFactory {
    return new GhostPaymasterFactory("GhostPaymasterFactory", address);
  }

  deploy(
    _token: Address,
    _tokenOracle: Address,
    _nativeAssetOracle: Address,
    _owner: Address,
    _priceMarkupLimit: BigInt,
    _priceMarkup: BigInt,
  ): Address {
    let result = super.call(
      "deploy",
      "deploy(address,address,address,address,uint32,uint32):(address)",
      [
        ethereum.Value.fromAddress(_token),
        ethereum.Value.fromAddress(_tokenOracle),
        ethereum.Value.fromAddress(_nativeAssetOracle),
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_priceMarkupLimit),
        ethereum.Value.fromUnsignedBigInt(_priceMarkup),
      ],
    );

    return result[0].toAddress();
  }

  try_deploy(
    _token: Address,
    _tokenOracle: Address,
    _nativeAssetOracle: Address,
    _owner: Address,
    _priceMarkupLimit: BigInt,
    _priceMarkup: BigInt,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "deploy",
      "deploy(address,address,address,address,uint32,uint32):(address)",
      [
        ethereum.Value.fromAddress(_token),
        ethereum.Value.fromAddress(_tokenOracle),
        ethereum.Value.fromAddress(_nativeAssetOracle),
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_priceMarkupLimit),
        ethereum.Value.fromUnsignedBigInt(_priceMarkup),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  selfKisser(): Address {
    let result = super.call("selfKisser", "selfKisser():(address)", []);

    return result[0].toAddress();
  }

  try_selfKisser(): ethereum.CallResult<Address> {
    let result = super.tryCall("selfKisser", "selfKisser():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get _selfKisser(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeployCall extends ethereum.Call {
  get inputs(): DeployCall__Inputs {
    return new DeployCall__Inputs(this);
  }

  get outputs(): DeployCall__Outputs {
    return new DeployCall__Outputs(this);
  }
}

export class DeployCall__Inputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
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
}

export class DeployCall__Outputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
