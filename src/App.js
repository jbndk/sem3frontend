import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import DestinationPage from './destination';
import ProfilePage from './myprofile';
import FavouritePage from './favourites';
import UserList from './admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
  Link,
  useHistory
} from "react-router-dom";

function LogIn({ login, errorMessage, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }


  return (
    <div>
      <form onChange={onChange} >
        <div className="col-sm-2">
          <br />
          <h2>Login</h2>
          <input class="form-control" placeholder="User Name" id="username" />
          <input class="form-control" placeholder="Password" id="password" />
          <br />
          <button class="btn btn-primary" onClick={performLogin}>Login</button>
        </div>
      </form>
      <h2>{errorMessage}</h2>
    </div>
  )
}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => {
    facade.fetchUserData().then(data => setDataFromServer(data.msg));
  }, [])

  useEffect(() => {
    facade.fetchAdminData().then(data => setDataFromServer(data.msg));
  }, [])

  return (
    <div>
      <h2>{dataFromServer} </h2>
    </div>
  )

}

function Header({ isLoggedin, loginMsg, isAdmin }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      
      {isLoggedin && (
        <>
        <li><NavLink activeClassName="active" to="/myprofile">My Profile</NavLink></li>
        <li><NavLink activeClassName="active" to="/favourites">Favourites</NavLink></li>
        <li><NavLink activeClassName="active" to="/destination">Destination</NavLink></li>
        </>
      )}
      
      {isLoggedin && (
        <>
        <li><NavLink activeClassName="active" to="/adminpage">Admin page</NavLink></li>
        </>
      )}

      <li><NavLink activeClassName="active" to="/login-out"> {loginMsg}  </NavLink></li>
      <li><NavLink activeClassName="active" to="/readme">READ ME</NavLink></li>
    </ul>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }

  useEffect(() => {
    const role = facade.getRole;

    if(role == "admin") {
      setIsAdmin(true);
      console.log("App says that user is admin. Role is: " + role)
    } else {
      console.log("App says that user is NOT admin. Role is: " + role)
    }
  }, [])

  const login = (user, pass) => {
    facade.login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setErrorMessage("");
      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
          console.log("Error: ", errorMessage);
        })
      })
  }

  return (
    <div class="col-sm">
      
      <Header loginMsg={loggedIn ? 'You are logged in' : 'Please log in'} isLoggedin={loggedIn} isAdmin={isAdmin} />

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path='/login-out'>
          {!loggedIn ? (
            <LogIn
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              login={login} />
          ) : (
              <div>
                <LoggedIn />
                <button class="btn btn-primary" onClick={logout}>Logout</button>
              </div>
            )}
        </Route>

        <Route exact path="/myprofile">
        {loggedIn ? <MyProfile /> : <AccessDenied />}     
        </Route>

        <Route exact path="/destination">
        {loggedIn ? <Destination /> : <AccessDenied />}          
        </Route>

        <Route exact path="/adminpage">
        {loggedIn ? <Admin /> : <AccessDenied />}          
        </Route>

        <Route exact path="/favourites">
          {loggedIn ? <Favourites /> : <AccessDenied />}
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>

    </div>
  )
}

function Home() {
  return (
    <div>
      <br />
      <h2>Home</h2>
      <br/>
      <h4>Please go to the READ ME tab for instructions. </h4>
      <br />
    </div>
  );
}

function MyProfile() {
  return (
    <div>
      <ProfilePage />
    </div>
  );
}

function Destination() {
  return (
    <div>
      <DestinationPage />
    </div>
  );
}

function Favourites() {
  return (
    <div>
      <FavouritePage />
    </div>
  );
}

function Admin() {
  return (
    <div>
      <UserList />
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h3>
      No match found for this.
      </h3>
    </div>
  );
};


const AccessDenied = () => {
  return (
      <>
      <br/><br/>
      <div class="alert alert-danger" role="alert">
      <h3>
        Access denied. Please log in.
      </h3>
      </div>
      </>
  );
};

const ReadMe = () => {
  return (
    <div>
      <h3>
        READ ME
      </h3>
      <br/>
      <p>
        <b>Welcome to our REACT App startcode!</b>
        <br/>
        <br/>
        IMPORTANT! Before using our startcode, make sure that you have installed <a href="https://nodejs.org/en/">Node.js</a>.
        <br/>
        <br/>
        <b>How to use:</b>
        <ul>
          <li>Download the project <a href="https://github.com/jbndk/CA3-Frontend">here</a></li>
          <li>Delete the .git file from the project</li>
          <li>Open the folder in Git Bash or a similar program</li>
          <li>Run <i>npm install</i></li>
          <li>Run <i>npm bootstrap</i></li>
          <li>Run <i>npm install react-router-dom</i></li>
          <li>Run <i>npm start</i> to open the project in a browser with hot reload</li>
          <li>Run <i>code .</i> to open the project in Visual Studio Code</li>
          <li>Remember to change the URL in settings.js to point on your own REST endpoint</li>
        </ul>
        
        <b>You are now done - happy coding!</b>
        </p>
    </div>
  );
};

export default App;
export {LogIn};