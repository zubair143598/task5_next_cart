import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="sm:px-[2rem] md:px-[2rem] lg:px-[3rem] text-white  xl:px-[10rem] bg-[#050505] py-6  ">
      <div className="">
        <a href="#">
          <h1
            className=" text-[#da0037] sm:text-[1rem] lg:text-[35px] 3xl:text-[40px]
                sm:font-[600] lg:font-[700]  3xl:font-[900] "
          >
            Next Cart
          </h1>
        </a>
        <p className="pt-2">Developed by Muhammad Zubair</p>
        <p className="flex flex-row mt-6 ">
          <BsLinkedin size={25} className="mr-4" />
          <BsGithub size={25} className="mx-4" />
          <BiEnvelope size={25} className="mx-4" />
          <AiOutlineWhatsApp size={25} className="mx-4" />{" "}
        </p>
        <div className="mt-[4rem] flex sm:flex-col flex-row justify-between">
          <p>
            Copyright © 2023 All rights reserved designed and developed by{" "}
            <span className="text-[#da0037]">Zubair</span>
          </p>
          <p>
            <a className="mx-3 font-[600] " href="#">Home</a>
            <a className="mx-3 font-[600] " href="#">Products</a>
            <a className="mx-3 font-[600] "  href="#">Contact</a>
          </p>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Footer;
