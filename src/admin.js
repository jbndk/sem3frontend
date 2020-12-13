import { useState } from "react";
import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [reqSent, setReqSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const getUsers = (evt) => {
        evt.preventDefault();
        let options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        fetch(mainURL + '/api/user/allusers' , options)
        .then(facade.handleHttpErrors)
        .then((res) => {
            setUsers(res);
            setReqSent(true)
            setErrorMessage("");
            }).catch((error) => {
              error.fullError.then((err) => {
                setErrorMessage(true);
                setReqSent(true);
                console.log("Error: ", errorMessage);
              })
            })
    }
            
    return (
        <div className="col-sm-4">
                    <br />
                    <h2>Press button to get a list of all registered non-admin users: </h2>
                    <br/>
                    <button className="btn btn-primary" onClick={getUsers}>Get all users</button>
                    <br/>
                    <br/>            

            {reqSent && (
                <div>
               <table className="table">
                    {users.map((user) => {
                        return (
                        <tr>
                        <td key={user}>{user}</td>
                        </tr>
                        )
                    })}
                </table>
                </div>
                )}
        </div>
    )
}


export default UserList;