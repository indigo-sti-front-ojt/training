import React from "react";
import "./styles.css";
import { UserCard } from "./components/UserCard"
import { userProfile } from "./types/userProfile";
import { useAllUsers } from "./hooks/useAllUsers";

const user = {
  id: 1,
  name: "じゃけぇ",
  email:"1234@aaa.com",
  address: "ADDRESS"
}

export default function App() {
  const {getUsers, userProfiles, loading , error} = useAllUsers();

  const onClickFetchUser = () => getUsers();
  return(
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <p> loading....</p>
      ) : (
        <>
          {userProfiles.map((user: userProfile) => (
          <UserCard key={user.id} user={user} />
          ))}
        </>
      )
      }
    </div>
  );
}