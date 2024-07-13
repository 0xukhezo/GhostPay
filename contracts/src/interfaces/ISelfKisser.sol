// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface ISelfKisser {
    /// @notice Kisses caller on oracle `oracle`.
    function selfKiss(address oracle) external;
}