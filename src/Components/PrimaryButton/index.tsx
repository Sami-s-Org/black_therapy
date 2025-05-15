import React from "react";
import Style from "./button.module.css";

interface PrimaryButtonProps {
  heading: string;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ heading }) => {
  return (
    <div>
      <button className={Style.btn}>{heading}</button>
    </div>
  );
};

export default PrimaryButton;
