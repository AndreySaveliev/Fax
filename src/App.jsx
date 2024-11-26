import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import MessageContainer from "./components/MessageContainer";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router";
import UserProfile from "./components/UserProfile";
function App() {
  // const apiKey = process.env.MISTRAL_API_KEY || 'your_api_key';
  const [showSide, setShowSide] = useState(false);

  const handleShowSideBar = () => {
    setShowSide(!showSide);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <Header index handleShowSideBar={handleShowSideBar} />
      <SideBar
        index
        showSide={showSide}
        handleShowSideBar={handleShowSideBar}
      />
      <Routes>
        <Route
          path="chats/:uuid"
          element={
            <>
              <MessageContainer />
              <Input />
            </>
          }
        />
        <Route path="/profile" element={<UserProfile />} />
        {/* <Input /> */}
      </Routes>
    </div>
  );
}

export default App;
