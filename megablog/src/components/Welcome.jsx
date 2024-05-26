import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
function Welcome() {
  const userData = useSelector((state) => state.auth.userData);
  if (userData) console.log("userdata", userData.name);

  return (
    <div
      className="w-full py-8 mt-5 text-center"
      style={{ marginBottom: "14rem" }}
    >
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              {userData ? (
                <div>welcome {userData.name}</div>
              ) : (
                <div>welcome to home page</div>
              )}
              {/* Login to read posts */}
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Welcome;
