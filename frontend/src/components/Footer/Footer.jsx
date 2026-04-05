import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  const options = [
    "© wordle.ap",
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Terms of Sale",
  ];
  return (
    <div className="flex items-start justify-center text-sm gap-1">
      {options.map((option, i) => {
        return (
          <div key={i} className="flex items-center justify-center text-white">
            <p className=" text-white m-1 p-1 hover:underline hover:cursor-pointer">{option} </p>
            {i < options.length - 1 && "|"}
          </div>
        );
      })}
    </div>
  );
}

export default Footer;
