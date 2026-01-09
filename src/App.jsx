import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import FeedPage from "./pages/FeedPage";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import Premium from "./components/Premium";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<Request />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
