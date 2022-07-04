import { useState } from "react";
import axios from "axios";
import { userProfile } from "../types/userProfile";
import { User } from "../types/api/user"

export const useAllUsers = () => {
//全ユーザ一覧を取得するカスタムフック
const [ userProfiles, setUserProfiles ] = useState<Array<userProfile>>([]);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(false);

const getUsers = () => {
    setLoading(true);
    setError(false);
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then( (res) =>{
      const data = res.data.map( (user: User) => ({
        id: user.id,
        name: `${user.name}(${user.username})`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`,
      }));
      setUserProfiles(data);
    })
    .catch(() => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });

}

return {getUsers, userProfiles, loading , error}

}