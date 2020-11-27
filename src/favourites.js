import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { Col } from "react-bootstrap";


const GetFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState(facade.getUsername);

    useEffect(() => {
        fetch(mainURL + "/api/destination/open/favourites/" + user)
        .then((res) => res.json())
        .then((data) => {
            console.log(user);
            console.log(data);
            setFavourites(data);
        });
      }, [])

    //{favourites.map((country) => 
    //  <a key={country} href="#" class="list-group-item list-group-item-action list-group-item-primary">{country}</a>
    //)}


    return (

        <div class="sm col-8">
            <br /><br />

            <div class="list-group">
                <h2>Your saved countries: </h2>
                <br></br>
                <ul>
                    {favourites.map((country, index) => {
                        return <li key={index}>{country}</li>;
                    })}
                </ul>

            </div>

        </div>
    )
}

export default GetFavourites;