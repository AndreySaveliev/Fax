"use client";
import React, { useState } from "react";
import userIcon from "./../public/user-circle.svg";
import menu from "./../public/menu.svg";
import Image from "next/image";
import SideBar from "./Sidebar/SideBar";
import { useRouter } from "next/navigation";
// function Header({ handleShowSideBar }) {
function Header() {
  const [showSide, setShowSide] = useState(false);
  const router = useRouter();

  const handleShowSideBar = () => {
    setShowSide(!showSide);
  };

  return (
    <div className="flex w-full flex-row justify-between px-5 pb-2 pt-4">
      <button onClick={handleShowSideBar}>
        <Image src={menu} alt="sidebar icon" />
      </button>
      {/* {location.pathname !== "/profile" && ( */}
      <button onClick={() => router.push("/profile")}>
        <Image src={userIcon} alt="profile icon" />
      </button>
      {/* )} */}
      <SideBar handleShowSideBar={handleShowSideBar} showSide={showSide} />
    </div>
  );
}

export default Header;
