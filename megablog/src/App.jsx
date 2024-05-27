import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className=" w-full  flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        {userData ? (
          <center>
            <h1 className="text-2xl font-bold hover:text-gray-500">
              <div>
                <div className="welcomeuser welcomMessage">
                  {userData ? `welcome ${userData.name}` : ""}{" "}
                </div>
              </div>
            </h1>
          </center>
        ) : (
          ""
        )}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
