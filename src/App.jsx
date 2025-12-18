import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import FeedPage from "./pages/FeedPage";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<LoginForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
