
import React, { useState } from "react";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function AddNewUser() {

        
  const init = {username: "", password: ""};
  const [newCredentials, setNewCredentials] = useState(init);
  

  const saveNewUser = (evt) => {
    evt.preventDefault();
    facade.addNewUser(newCredentials.username, newCredentials.password);
    alert(`Welcome, ${newCredentials.username}. You are now a user. Please log in`);
    window.location = '/login-out';
    
    //facade.login(newCredentials.username, newCredentials.password);
};
const onChange = (evt) => {
  setNewCredentials({ ...newCredentials, [evt.target.id]: evt.target.value,
  });
};
    return (
        <div class="sm col-4">
            <h2>Create a New User</h2>
            <br/>
            <form onChange={onChange}>
              <input className="form-control" placeholder="User Name" id="username" />
              <br />
              <input className="form-control" placeholder="Password" id="password" />
            </form>
            <br/>
            <button className="btn btn-primary" onClick={saveNewUser}>
            Save
          </button> 
           
            
        </div>
    )
}