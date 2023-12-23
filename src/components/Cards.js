import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/users";

export default function Cards() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const users = response.data;

      Promise.all(
        users.map((user) =>
          axios
            .get(`${postsURL}?userId=${user.id}`)
            .then((response) => response.data)
        )
      ).then((postsByUsers) => {
        const userDataWithPosts = users.map((user, index) => ({
          ...user,
          postCount: postsByUsers[index].length,
        }));
        setUserData(userDataWithPosts);
      });
    });
  }, []);

  const handleCardClick = (userId) => {
    window.location.href = `/user/${userId}`;
  }

  if (!userData) return null;

  return (
    <div className="container">
      {userData.map((user) => (
        <div
          key={user.id}
          className="d-flex flex-row justify-content-between card my-3 p-3"
          style={{ borderRadius: "10px" }}
          onClick={() => handleCardClick(user.id)}
        >
          <div className="card-body-name">Name: {user.name}</div>
          <div className="card-body-posts">Posts: {user.postCount}</div>
        </div>
      ))}
    </div>
  );
}
