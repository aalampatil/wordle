import React from "react";
import { UseAuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const { user, loading } = UseAuthContext();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center">No user data</p>;
  }

  return (
    <div>
      <div>
        <img className="h-[60px]" src={user.profilePicture} alt="profile" />
        <p className="text-black dark:text-white m-1 p-1 text-lg">
          Name: {user.name}
        </p>
        <p className="text-black dark:text-white m-1 p-1 text-lg">
          Email: {user.email}
        </p>
        <p className="text-black dark:text-white m-1 p-1 text-lg">
          Account created on: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}

export default Account;

// import React, { useEffect, useState } from "react";
// import { UseAuthContext } from "../context/Auth";
// import { useNavigate } from "react-router-dom";

// function Account() {

//   const [profile, setProfile] = useState({})
//   const Naviagte = useNavigate()
//   const { user } = UseAuthContext();
//   useEffect(() => {
//     setProfile(user)
//     console.log({ user });
//   }, []);
//   return <div>
//     <div>
//       <img className="h-[60px]" src={profile.profilePicture} alt="" />
//       <p className="text-black dark:text-white m-1 p-1 text-lg ">Name : {profile.name}</p>
//       <p className="text-black dark:text-white m-1 p-1 text-lg ">Email: {profile.email}</p>
//       <p className="text-black dark:text-white m-1 p-1 text-lg ">Account created on: {profile.createdAt}</p>
//     </div>

//     <div>
//       <button onClick={() => Naviagte("/")}>Home</button>
//     </div>
//   </div>;
// }

// export default Account;
