import React from "react";
import userIcon from "./../assets/user-circle.svg";
import menu from "./../assets/menu.svg";
import { useLocation, useNavigate } from "react-router";
function Header({ handleShowSideBar }) {
  const navigate = useNavigate();
  let location = useLocation();
  const handleSelectChat = (id) => {
    navigate(`../${id}`, { replace: true });
    handleShowSideBar();
  };

  return (
    <div className="flex w-full flex-row justify-between px-5 pb-2 pt-4">
      <button onClick={handleShowSideBar}>
        <img src={menu} />
      </button>
      {location.pathname !== "/profile" && (
        <button onClick={() => navigate("../profile")}>
          <img src={userIcon} />
        </button>
      )}
    </div>
  );
}

export default Header;
