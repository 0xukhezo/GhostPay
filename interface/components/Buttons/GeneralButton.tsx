"use client";
import React, { ReactNode } from "react";

type GeneralButtonProps = {
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
};

function GeneralButton({
  className,
  onClick,
  disabled,
  children,
}: GeneralButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default GeneralButton;
