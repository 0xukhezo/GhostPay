"use client";

import React, { useState, useEffect } from "react";
// Images
import HomeImage from "../public/HomeImage.jpeg";
// Components
import { useModal } from "../components/Context/ModalContextProvider";
import { useLogin } from "../components/Context/LoginContextProvider";
import Qr from "../components/Modals/Content/Qr";

const HomePage: React.FC = () => {
  const [nfcData, setNfcData] = useState(undefined);
  const { login, logout, loggedIn, smartAccount } = useLogin();
  const { setIsModalOpen, setContent, setTitle } = useModal();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const generateQrCode = () => {
    const url = `https://10.251.95.190:3000/nfc-reader`;
    setIsModalOpen(true);
    setContent(<Qr qrUrl={url} />);
    setTitle(`Scan this QR`);
  };

  const setChangeWidth = () => {
    const hiddenElementsLogin = document.querySelectorAll(".login") as any;
    if (hiddenElementsLogin.length > 0) {
      hiddenElementsLogin[0].classList.remove("login");
      hiddenElementsLogin[0].classList.add("loginClose");
      hiddenElementsLogin[1].classList.remove("login");
      hiddenElementsLogin[1].classList.add("loginExpand");
      setTransition(true);
      setInterval(() => {
        setDataLoaded(true);
      }, 3000);
    }
  };

  useEffect(() => {
    const nfcLogin = localStorage.getItem("NfcData");

    if (localStorage && nfcLogin) {
      setDataLoaded(true);
    } else {
      const interval = setInterval(async () => {
        try {
          const response = await fetch("/api/nfc");
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("NfcData", data.jwtGenerated);
            setNfcData(data.jwtGenerated);
            clearInterval(interval);
            setIsModalOpen(false);
            login(data?.jwtGenerated);
          }
        } catch (error) {
          console.error("Error fetching NFC data:", error);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    smartAccount && nfcData && setChangeWidth();
  }, [nfcData, smartAccount]);

  return (
    <div className="flex flex-row w-screen h-screen text-white bg-main">
      {dataLoaded ? (
        <div className="text-white bg-main w-screen h-screen ">pepe</div>
      ) : (
        <>
          <div
            className="login flex flex-col justify-center bg-greenMatrix w-full text-homeTitle bg-cover"
            style={{ backgroundImage: `url('${HomeImage.src}')` }}
          ></div>
          <div className="login flex flex-col justify-center items-center w-full">
            <div className="text-center flex flex-col justify-center">
              <div className="font-black text-5xl tracking-widest mx-auto">
                Keep your money private
              </div>
              {!transition ? (
                <>
                  <div className="my-[24px] max-w-[397px] text-center mx-auto text-xl">
                    Allow users to use a payer in their smart wallets
                  </div>
                  <button
                    onClick={generateQrCode}
                    className="bg-greenMatrix py-4 px-6 rounded-xl hover:bg-green-600 w-fit mx-auto font-bold text-main"
                  >
                    Join the ghosts
                  </button>
                </>
              ) : (
                <>
                  <div className="my-[24px] max-w-[397px] text-center mx-auto text-xl">
                    Enter in Silence ecosystem
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;