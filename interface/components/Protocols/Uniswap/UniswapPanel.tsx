import React, { useEffect, useState } from "react";

// Context
import { useLogin } from "../../Context/LoginContextProvider";
// Components
import GeneralButton from "../../Buttons/GeneralButton";
import UniswapFeed from "../../Feeds/UniswapFeed";

interface UniswapPanelInterface {
  display: string;
  getDisplay: (display: string) => void;
}

export default function UniswapPanel({
  display,
  getDisplay,
}: UniswapPanelInterface) {
  const { provider } = useLogin();
  const [uniswapPositionsID, setUniswapPositionsID] = useState<string[]>();
  const [displayPositions, setDisplayPositions] = useState<string>(display);

  const changeDisplay = (display: string) => {
    setDisplayPositions("uniswapPositionsOpen");
    getDisplay(display);
  };

  return (
    <main className="fade-in">
      {displayPositions === "uniswapPositions" ? (
        <>
          <h2 className="flex justify-between w-full pt-8">
            <p className="flex flex-row items-center z-10 justify-between w-full">
              <span className="text-base text-start text-base md:text-2xl">
                Current LP Positions
              </span>
              <GeneralButton
                className="px-5 py-2 bg-greenMatrix rounded-xl hover:bg-green-600 text-main font-light font-semibold"
                disabled={false}
                onClick={() => changeDisplay("uniswapPositionsOpen")}
              >
                Open LP Position
              </GeneralButton>
            </p>
          </h2>
          <UniswapFeed uniswapPositionsID={uniswapPositionsID} />
        </>
      ) : (
        <div>Pepe</div>
      )}
    </main>
  );
}
