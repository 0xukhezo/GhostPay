"use client";
// React
import React, { Fragment } from "react";
// Styles
import styles from "./Modal.module.css";
// Headlessui
import { Dialog, Transition } from "@headlessui/react";
// Heroicons
import { XMarkIcon } from "@heroicons/react/24/outline";
// Context
import { useModal } from "../Context/ModalContextProvider";

export default function Modal() {
  const { closeModal, isModalOpen, content, title, isClosing } = useModal();

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div
          className={`${styles.overlayBottomModal} ${
            isModalOpen ? `${styles.open}` : ""
          }`}
          onClick={() => closeModal()}
        >
          <Dialog.Panel
            className={`${styles.modalBottomModal} ${
              isClosing ? `${styles.closing}` : ""
            } rounded-lg px-4 pb-4 pt-5 text-left text-main shadow-xl sm:my-8 xl:w-[30vw] md:w-[50vw] w-[90%] sm:w-[70vw] sm:p-6 overflow-auto h-[75%] lg:h-fit bg-white`}
          >
            <div className="mb-4">
              <h1 className="text-2xl">{title}</h1>
              <div className="absolute right-0 top-6 pr-4 block hover:text-red-500">
                <button
                  type="button"
                  className="rounded-md"
                  onClick={() => closeModal()}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            {content}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
