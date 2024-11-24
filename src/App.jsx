import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import MessageContainer from "./components/MessageContainer";
import SideBar from "./components/SideBar";
import { Outlet, Route, Router, Routes } from "react-router";
function App() {
  // const apiKey = process.env.MISTRAL_API_KEY || 'your_api_key';
  const [showSide, setShowSide] = useState(false);

  const handleShowSideBar = () => {
    setShowSide(!showSide);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <Header handleShowSideBar={handleShowSideBar} />
      <SideBar showSide={showSide} handleShowSideBar={handleShowSideBar} />
      <Routes>
        <Route
          path="/:uuid"
          element={
            <>
              <MessageContainer />
              <Input />
            </>
          }
        />
      </Routes>
      {/* <Input /> */}
    </div>
  );
}

export default App;
