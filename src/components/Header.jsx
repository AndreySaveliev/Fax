import React from "react";
import userIcon from "./../assets/user-circle.svg";
import menu from "./../assets/menu.svg";
function Header({ handleShowSideBar }) {
  return (
    <div className="flex w-full flex-row justify-between px-5 pb-2 pt-4">
      <button onClick={handleShowSideBar}>
        <img src={menu} />
      </button>
      <button>
        <img src={userIcon} />
      </button>
    </div>
  );
}

export default Header;
