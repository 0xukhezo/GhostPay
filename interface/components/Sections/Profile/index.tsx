"use client";

// Next
import Image from "next/image";
import { usePathname } from "next/navigation";
// Identicon
import Identicon from "identicon.js";

import Link from "next/link";

import PaymasterCard from "../../Cards/PaymasterCard";
import { useFetchPaymaster } from "../../../hooks/usePaymasters";
import { PaymasterInfo } from "../../../config/types";
import { useLogin } from "../../Context/LoginContextProvider";

function ProfileSection() {
  const { paymasters } = useFetchPaymaster();
  const { smartAccount } = useLogin();
  const pathname = usePathname();

  const ownedPaymasters = paymasters.filter((paymaster: PaymasterInfo) => {
    return paymaster.owner === smartAccount;
  });

  return (
    <main>
      <div className="flex items-center mt-8">
        <Image
          width={64}
          height={64}
          alt="Profile Image"
          src={`data:image/png;base64,${new Identicon(
            pathname.split("/")[2] ||
              "0x1eB3BE5e1Bb85D1090ABD92005aD87590687F2AC",
            64
          ).toString()}`}
          className="rounded-full"
        />
        <h2 className="w-fit flex justify-between text-base text-start text-base md:text-2xl ml-6">
          {pathname.split("/")[2] ||
            "0x1eb3be5e1bb85d1090abd92005ad87590687f2ac"}
          Profile
        </h2>
      </div>{" "}
      <h2 className="w-fit flex justify-between text-base text-start text-base md:text-2xl mt-10 border-b-1 border-greenMatrix w-full">
        Your Paymasters
      </h2>{" "}
      {ownedPaymasters.length !== 0 ? (
        <div className="mt-4">
          {ownedPaymasters.map((paymaster: any, index: number) => {
            return (
              <PaymasterCard
                key={`${paymaster.title}-${index}`}
                index={index}
                paymaster={paymaster}
              />
            );
          })}
        </div>
      ) : (
        <p className="flex flex-col items-center text-lg mt-10">
          <span className="mb-4">You don't have any paymaster created</span>
          <Link
            href="/paymasters/create"
            className="underline underline-offset-4 text-greenMatrix font-semibold"
          >
            Create one
          </Link>
        </p>
      )}
    </main>
  );
}

export default ProfileSection;
