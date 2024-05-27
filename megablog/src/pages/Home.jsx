import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);
  console.log(useSelector((state) => state.auth));
  useEffect(() => {
    if (userData) {
      setLoading(true);
      appwriteService
        .getPosts([Query.equal("userId", userData.$id)])
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1
                className="text-2xl font-bold hover:text-gray-500"
                style={{ margin: "12vh 0" }}
              >
                {!authStatus ? (
                  "Login to read posts"
                ) : authStatus && loading ? (
                  <ClipLoader color="#46494f" />
                ) : (
                  "No Post Available"
                )}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
