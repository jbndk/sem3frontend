import { useState, useEffect } from "react";
import mainURL from "./settings";
const UserList = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch(mainURL + '/api/user/allusers')
        const data = await response.json()
        setUsers(data);
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <ul className="list">
                {users.map((user) => {
                    return (
                        <li key={user}>{user}</li>
                    )
                })}
            </ul>
        </>
    )
}
export default UserList;