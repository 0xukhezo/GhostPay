import { NewPaymaster as NewPaymasterEvent} from "../generated/GhostPaymasterFactory/GhostPaymasterFactory"
import { Paymaster } from "../generated/schema"
import { ZERO_BI } from "./constants"
import {CHAIN_ID} from "./config";
import { GhostPaymaster as PaymasterTemplate} from "../generated/templates"

export function handleNewPaymaster(
  event: NewPaymasterEvent
): void {
  let entity = new Paymaster(
    event.params.paymaster.toHexString()
  );

  entity.chainId = CHAIN_ID;
  entity.owner = event.params.owner.toHexString();
  entity.executedUo = ZERO_BI;
  entity.token =  event.params.token.toHexString(),
  entity.price =  event.params.priceMarkup;

  entity.save()

  PaymasterTemplate.create(event.params.paymaster)
}
