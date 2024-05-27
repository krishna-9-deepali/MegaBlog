import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { ClipLoader } from "react-spinners";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userData) {
      setLoading(true);
      service
        .getPosts()
        .then((posts) => {
          console.log(posts);
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="w-full py-8  text-center ">
      <Container>
        <div className="flex flex-wrap justify-center ">
          {loading ? (
            <div className="w-full p-2  flex justify-center">
              <ClipLoader color="#46494f" />
            </div>
          ) : posts.length === 0 ? (
            <center>
              <div className="text-lg">No post Available</div>
            </center>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
