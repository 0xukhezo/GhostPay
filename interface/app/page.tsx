"use client";

import React, { useState, useEffect } from "react";
// Images
import HomeImage from "../public/HomeImage.jpeg";
// Components
import { useModal } from "../components/Context/ModalContextProvider";
import { useLogin } from "../components/Context/LoginContextProvider";
import Qr from "../components/Modals/Content/Qr";
import SideBar from "../components/Layout/SideBar/SideBar";
import Home from "../components/Sections/Home/Home";

const HomePage: React.FC = () => {
  const { login, loggedIn } = useLogin();
  const { setIsModalOpen, setContent, setTitle } = useModal();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const generateQrCode = () => {
    const url = `https://172.20.10.2:3000/nfc-reader`;
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
    if (loggedIn) {
      setDataLoaded(true);
    }
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/nfc");
        if (response.ok) {
          const data = await response.json();
          clearInterval(interval);
          setIsModalOpen(false);
          login(data?.jwtGenerated);
        }
      } catch (error) {
        console.error("Error fetching NFC data:", error);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loggedIn && setChangeWidth();
  }, [loggedIn]);

  return (
    <div className="flex flex-row w-screen h-screen text-white bg-main">
      {loggedIn && dataLoaded ? (
        <div className="text-white bg-main w-screen h-screen ">
          <SideBar page={<Home />} />
        </div>
      ) : (
        <>
          <div
            className="login flex flex-col justify-center bg-greenMatrix w-full text-homeTitle bg-cover"
            style={{ backgroundImage: `url('${HomeImage.src}')` }}
          ></div>
          <div className="login flex flex-col justify-center items-center w-full">
            <div className="text-center flex flex-col justify-center">
              <div className="font-black text-5xl tracking-widest mx-auto">
                Paymasters accessible to anyone
              </div>
              {!transition ? (
                <>
                  <div className="my-[24px] max-w-[397px] text-center mx-auto text-xl">
                    We built No-code tool to create custom Paymasters
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
                    Enter in GhostPay ecosystem
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
