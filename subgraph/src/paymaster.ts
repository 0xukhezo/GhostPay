import { MarkupUpdated as MarkupUpdatedEvent, UserOperationSponsored as UserOperationSponsoredEvent } from "../generated/templates/GhostPaymaster/GhostPaymaster";
import { ONE_BI } from "./constants"
import { Paymaster } from "../generated/schema"

export function handleUserOperationSponsored(
  event: UserOperationSponsoredEvent
): void {
  const paymaster = Paymaster.load(event.address.toHexString());
  if(paymaster !== null){
    paymaster.executedUo = paymaster.executedUo .plus(ONE_BI)
    paymaster.save();
  }
}

export function handleMarkupUpdate(event: MarkupUpdatedEvent): void {
  const paymaster = Paymaster.load(event.address.toHexString());
  if(paymaster !== null){
    paymaster.price = event.params.priceMarkup;
    paymaster.save();
  }
}
