import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { Col } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";


const RemoveFavourite = (country) => {
    fetch(mainURL + "/api/destination/open/favourites/")
    .then((res) => res.json())
    .then((data) => {
    console.log("");      
})}

const GetFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState(facade.getUsername);;

    useEffect(() => {
        fetch(mainURL + "/api/destination/open/favourites/" + user)
        .then((res) => res.json())
        .then((data) => {
            setFavourites(data);
        });
      }, [])

    return (
        <div class="container-align-left">
        <br /><br />
        <div class="row">
        <div class="col-sm">
        <div class="borderright">
            <div class="list-group">
                <h2>Your saved countries: </h2>
                <br></br>
                <table class="table">
                        
                    {favourites.map((country, index) => {
                        
                        return (
                        <tr>
                        <td key={index}><Link to={{pathname: "/Destination", state: {destination: country}}}>{country.charAt(0).toUpperCase() + country.slice(1)}</Link></td>
                        <td><button type="button" class="btn btn-outline-danger" onClick={RemoveFavourite(country)}>Remove</button></td>
                        
                        <td key={index}><button type="button" class="btn btn-outline-info" onClick={() => CountryData(country)}>Show data</button></td>

                        </tr>
                        )
                    })}
                </table>
                </div>
                </div>
                </div>

                <div class="col-lg">
                <CountryData />
                </div>
                </div>
                </div>
    )
}

function CountryData(country) {

    const [countryData, setCountryData] = useState("");
    const [countryDataExists, setCountryDataExists] = useState(false);

    useEffect(() => {     
            let options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        fetch(mainURL + "/api/destination/open/" + country, options)
            .then(facade.handleHttpErrors)
            .then((res) => {
                setCountryDataExists(true);
                setCountryData(res);
            })

     // }, [])

return (
  <div>
    <h2>Data here</h2>
    {countryDataExists && (
    {countryData}
    )}
  </div>
);
}

export default GetFavourites;