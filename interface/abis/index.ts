const abiERC20 = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const abiGhostPayFactory = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_entryPoint",
        type: "address",
        internalType: "contract IEntryPoint",
      },
      {
        name: "_refundPostOpCost",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_selfKisser",
        type: "address",
        internalType: "contract ISelfKisser",
      },
      {
        name: "_stalenessThreshold",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deploy",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "contract IERC20Metadata",
      },
      {
        name: "_tokenOracle",
        type: "address",
        internalType: "contract IChronicle",
      },
      {
        name: "_nativeAssetOracle",
        type: "address",
        internalType: "contract IChronicle",
      },
      { name: "_owner", type: "address", internalType: "address" },
      { name: "_priceMarkupLimit", type: "uint32", internalType: "uint32" },
      { name: "_priceMarkup", type: "uint32", internalType: "uint32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "entryPoint",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IEntryPoint" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "refundPostOpCost",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "selfKisser",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract ISelfKisser" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "stalenessThreshold",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "NewPaymaster",
    inputs: [
      {
        name: "paymaster",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "priceMarkup",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
];

const abiEntryPoint = [
  {
    inputs: [
      { internalType: "uint256", name: "preOpGas", type: "uint256" },
      { internalType: "uint256", name: "paid", type: "uint256" },
      { internalType: "uint48", name: "validAfter", type: "uint48" },
      { internalType: "uint48", name: "validUntil", type: "uint48" },
      { internalType: "bool", name: "targetSuccess", type: "bool" },
      { internalType: "bytes", name: "targetResult", type: "bytes" },
    ],
    name: "ExecutionResult",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "opIndex", type: "uint256" },
      { internalType: "string", name: "reason", type: "string" },
    ],
    name: "FailedOp",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "SenderAddressResult",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "aggregator", type: "address" }],
    name: "SignatureValidationFailed",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "preOpGas", type: "uint256" },
          { internalType: "uint256", name: "prefund", type: "uint256" },
          { internalType: "bool", name: "sigFailed", type: "bool" },
          { internalType: "uint48", name: "validAfter", type: "uint48" },
          { internalType: "uint48", name: "validUntil", type: "uint48" },
          { internalType: "bytes", name: "paymasterContext", type: "bytes" },
        ],
        internalType: "struct IEntryPoint.ReturnInfo",
        name: "returnInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "senderInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "factoryInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "paymasterInfo",
        type: "tuple",
      },
    ],
    name: "ValidationResult",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "preOpGas", type: "uint256" },
          { internalType: "uint256", name: "prefund", type: "uint256" },
          { internalType: "bool", name: "sigFailed", type: "bool" },
          { internalType: "uint48", name: "validAfter", type: "uint48" },
          { internalType: "uint48", name: "validUntil", type: "uint48" },
          { internalType: "bytes", name: "paymasterContext", type: "bytes" },
        ],
        internalType: "struct IEntryPoint.ReturnInfo",
        name: "returnInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "senderInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "factoryInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "stake", type: "uint256" },
          { internalType: "uint256", name: "unstakeDelaySec", type: "uint256" },
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "paymasterInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "aggregator", type: "address" },
          {
            components: [
              { internalType: "uint256", name: "stake", type: "uint256" },
              {
                internalType: "uint256",
                name: "unstakeDelaySec",
                type: "uint256",
              },
            ],
            internalType: "struct IStakeManager.StakeInfo",
            name: "stakeInfo",
            type: "tuple",
          },
        ],
        internalType: "struct IEntryPoint.AggregatorStakeInfo",
        name: "aggregatorInfo",
        type: "tuple",
      },
    ],
    name: "ValidationResultWithAggregation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "factory",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymaster",
        type: "address",
      },
    ],
    name: "AccountDeployed",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "BeforeExecution", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDeposit",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "SignatureAggregatorChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalStaked",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unstakeDelaySec",
        type: "uint256",
      },
    ],
    name: "StakeLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256",
      },
    ],
    name: "StakeUnlocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "StakeWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "paymaster",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "success", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "actualGasCost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "actualGasUsed",
        type: "uint256",
      },
    ],
    name: "UserOperationEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "revertReason",
        type: "bytes",
      },
    ],
    name: "UserOperationRevertReason",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "SIG_VALIDATION_FAILED",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "initCode", type: "bytes" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "bytes", name: "paymasterAndData", type: "bytes" },
    ],
    name: "_validateSenderAndPaymaster",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "unstakeDelaySec", type: "uint32" },
    ],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "deposits",
    outputs: [
      { internalType: "uint112", name: "deposit", type: "uint112" },
      { internalType: "bool", name: "staked", type: "bool" },
      { internalType: "uint112", name: "stake", type: "uint112" },
      { internalType: "uint32", name: "unstakeDelaySec", type: "uint32" },
      { internalType: "uint48", name: "withdrawTime", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getDepositInfo",
    outputs: [
      {
        components: [
          { internalType: "uint112", name: "deposit", type: "uint112" },
          { internalType: "bool", name: "staked", type: "bool" },
          { internalType: "uint112", name: "stake", type: "uint112" },
          { internalType: "uint32", name: "unstakeDelaySec", type: "uint32" },
          { internalType: "uint48", name: "withdrawTime", type: "uint48" },
        ],
        internalType: "struct IStakeManager.DepositInfo",
        name: "info",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint192", name: "key", type: "uint192" },
    ],
    name: "getNonce",
    outputs: [{ internalType: "uint256", name: "nonce", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "initCode", type: "bytes" }],
    name: "getSenderAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "initCode", type: "bytes" },
          { internalType: "bytes", name: "callData", type: "bytes" },
          { internalType: "uint256", name: "callGasLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          { internalType: "uint256", name: "maxFeePerGas", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          { internalType: "bytes", name: "paymasterAndData", type: "bytes" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
    ],
    name: "getUserOpHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "uint256", name: "nonce", type: "uint256" },
              { internalType: "bytes", name: "initCode", type: "bytes" },
              { internalType: "bytes", name: "callData", type: "bytes" },
              {
                internalType: "uint256",
                name: "callGasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "verificationGasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxFeePerGas",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxPriorityFeePerGas",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "paymasterAndData",
                type: "bytes",
              },
              { internalType: "bytes", name: "signature", type: "bytes" },
            ],
            internalType: "struct UserOperation[]",
            name: "userOps",
            type: "tuple[]",
          },
          {
            internalType: "contract IAggregator",
            name: "aggregator",
            type: "address",
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct IEntryPoint.UserOpsPerAggregator[]",
        name: "opsPerAggregator",
        type: "tuple[]",
      },
      { internalType: "address payable", name: "beneficiary", type: "address" },
    ],
    name: "handleAggregatedOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "initCode", type: "bytes" },
          { internalType: "bytes", name: "callData", type: "bytes" },
          { internalType: "uint256", name: "callGasLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          { internalType: "uint256", name: "maxFeePerGas", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          { internalType: "bytes", name: "paymasterAndData", type: "bytes" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct UserOperation[]",
        name: "ops",
        type: "tuple[]",
      },
      { internalType: "address payable", name: "beneficiary", type: "address" },
    ],
    name: "handleOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint192", name: "key", type: "uint192" }],
    name: "incrementNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "callData", type: "bytes" },
      {
        components: [
          {
            components: [
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "uint256", name: "nonce", type: "uint256" },
              {
                internalType: "uint256",
                name: "callGasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "verificationGasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256",
              },
              { internalType: "address", name: "paymaster", type: "address" },
              {
                internalType: "uint256",
                name: "maxFeePerGas",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxPriorityFeePerGas",
                type: "uint256",
              },
            ],
            internalType: "struct EntryPoint.MemoryUserOp",
            name: "mUserOp",
            type: "tuple",
          },
          { internalType: "bytes32", name: "userOpHash", type: "bytes32" },
          { internalType: "uint256", name: "prefund", type: "uint256" },
          { internalType: "uint256", name: "contextOffset", type: "uint256" },
          { internalType: "uint256", name: "preOpGas", type: "uint256" },
        ],
        internalType: "struct EntryPoint.UserOpInfo",
        name: "opInfo",
        type: "tuple",
      },
      { internalType: "bytes", name: "context", type: "bytes" },
    ],
    name: "innerHandleOp",
    outputs: [
      { internalType: "uint256", name: "actualGasCost", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint192", name: "", type: "uint192" },
    ],
    name: "nonceSequenceNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "initCode", type: "bytes" },
          { internalType: "bytes", name: "callData", type: "bytes" },
          { internalType: "uint256", name: "callGasLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          { internalType: "uint256", name: "maxFeePerGas", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          { internalType: "bytes", name: "paymasterAndData", type: "bytes" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct UserOperation",
        name: "op",
        type: "tuple",
      },
      { internalType: "address", name: "target", type: "address" },
      { internalType: "bytes", name: "targetCallData", type: "bytes" },
    ],
    name: "simulateHandleOp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "initCode", type: "bytes" },
          { internalType: "bytes", name: "callData", type: "bytes" },
          { internalType: "uint256", name: "callGasLimit", type: "uint256" },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          { internalType: "uint256", name: "maxFeePerGas", type: "uint256" },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          { internalType: "bytes", name: "paymasterAndData", type: "bytes" },
          { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
    ],
    name: "simulateValidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address",
      },
      { internalType: "uint256", name: "withdrawAmount", type: "uint256" },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const abiPaymaster = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "contract IERC20Metadata",
      },
      {
        name: "_entryPoint",
        type: "address",
        internalType: "contract IEntryPoint",
      },
      {
        name: "_tokenOracle",
        type: "address",
        internalType: "contract IChronicle",
      },
      {
        name: "_nativeAssetOracle",
        type: "address",
        internalType: "contract IChronicle",
      },
      {
        name: "_stalenessThreshold",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_priceMarkupLimit",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_priceMarkup",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_refundPostOpCost",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_selfKisser",
        type: "address",
        internalType: "contract ISelfKisser",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "PRICE_DENOMINATOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addStake",
    inputs: [
      {
        name: "unstakeDelaySec",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "entryPoint",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IEntryPoint",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDeposit",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nativeAssetOracle",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IChronicle",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "postOp",
    inputs: [
      {
        name: "mode",
        type: "uint8",
        internalType: "enum IPaymaster.PostOpMode",
      },
      {
        name: "context",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "actualGasCost",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "actualUserOpFeePerGas",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "priceMarkup",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "priceMarkupLimit",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "refundPostOpCost",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stalenessThreshold",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenDecimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenOracle",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IChronicle",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlockStake",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateMarkup",
    inputs: [
      {
        name: "_priceMarkup",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validatePaymasterUserOp",
    inputs: [
      {
        name: "userOp",
        type: "tuple",
        internalType: "struct PackedUserOperation",
        components: [
          {
            name: "sender",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "initCode",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "callData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "accountGasLimits",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "preVerificationGas",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "gasFees",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "paymasterAndData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "userOpHash",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "maxCost",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "context",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "validationData",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawStake",
    inputs: [
      {
        name: "withdrawAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawTo",
    inputs: [
      {
        name: "withdrawAddress",
        type: "address",
        internalType: "address payable",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawToken",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MarkupUpdated",
    inputs: [
      {
        name: "priceMarkup",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserOperationSponsored",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenAmountPaid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OraclePriceNotPositive",
    inputs: [],
  },
  {
    type: "error",
    name: "OraclePriceStale",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "PriceMarkupTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "PriceMarkupTooLow",
    inputs: [],
  },
];

export { abiGhostPayFactory, abiPaymaster, abiEntryPoint, abiERC20 };
