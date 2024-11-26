import React from "react";
import profile from "./../assets/person.png";
import profileImg from "./../assets/profileimg.png";
import logout from "./../assets/log-out.png";
import lang from "./../assets/globe.png";
import arrow from "./../assets/arrow-ios-right.png";
function UserProfile() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col">
        <img className="mb-3 w-32 self-center" src={profileImg} />
        <h1 className="text-center text-2xl">Shambhavi Mishra</h1>
        <p className="text-center text-xl">@m.shambhavi</p>
      </div>
      <div className="flex w-full flex-col items-start">
        {/* <button className="flex w-full flex-row justify-between p-6">
          <img className="mr-3 self-center" src={profile} />
          <p className="text-lg">Edit Profile</p>
          <img className="" src={arrow} />
        </button> */}
        <button className="flex w-full flex-row justify-between p-6">
          <img className="mr-3 self-center" src={lang} />
          <p className="text-lg">Languages</p>
          <img className="" src={arrow} />
        </button>
        <button className="flex w-full flex-row justify-between p-6">
          <img className="mr-3 self-center" src={logout} />
          <p className="text-lg">Log out</p>
          <img src={arrow} />
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
