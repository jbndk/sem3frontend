import { useState } from "react";
import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [reqSent, setReqSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [usersFavourites, setUsersFavourites] = useState([]);
    const [userSelected, setUserSelected] = useState(false);

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

    const GetUsersFavourites = (user) => {
        fetch(mainURL + "/api/destination/open/favourites/" + user)
        .then((res) => res.json())
        .then((data) => {
            setUsersFavourites(data);
            setUserSelected(true);
            console.log(data)
            });
    }
            
    return (
        <div className="col-sm-5">
                    <br />
                    <h2>Press button to get a list of all registered non-admin usernames: </h2>
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
                        <td><button type="button" size="sm" class="btn btn-outline-info" onClick={() => GetUsersFavourites(user)}>
                            Show users saved favourites
                            </button></td>
                        </tr>
                        )
                    })}
                </table>
                </div>
                )}

                {userSelected && (
                    <div>
                        <table className="table2" width="100%">                        
                        {usersFavourites.map((country) => {

                        return (
                        <tr>
                        <td key={country}>{country.charAt(0).toUpperCase() + country.slice(1)}</td>
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