import React from "react";
import profile from "./../../public/person.png";
import profileImg from "./../../public/profileimg.png";
import logout from "./../../public/log-out.png";
import lang from "./../../public/globe.png";
import arrow from "./../../public/arrow-ios-right.png";
import Image from "next/image";
export default function ProfilePage() {
  return (
    <div className="mx-auto flex flex-col items-center lg:max-w-[20%]">
      <div className="mb-4 flex flex-col">
        <Image className="mb-3 w-32 self-center" src={profileImg} alt="user profile img" />
        <h1 className="text-center text-2xl">Shambhavi Mishra</h1>
        <p className="text-center text-xl">@m.shambhavi</p>
      </div>
      <div className="flex w-full flex-col items-start">
        <button className="flex w-full flex-row justify-between p-6">
          <Image className="mr-3 self-center" src={profile} alt="edit profile img" />
          <p className="text-lg">Edit Profile</p>
          <Image className="" src={arrow} alt="arrow img" />
        </button>
        <button className="flex w-full flex-row justify-between p-6">
          <Image className="mr-3 self-center" src={lang} alt="globe img" />
          <p className="text-lg">Languages</p>
          <Image className="" src={arrow} alt="arrow img" />
        </button>
        <button className="flex w-full flex-row justify-between p-6">
          <Image className="mr-3 self-center" src={logout} alt="exit img" />
          <p className="text-lg">Log out</p>
          <Image src={arrow} alt="arrow img" />
        </button>
      </div>
    </div>
  );
}
