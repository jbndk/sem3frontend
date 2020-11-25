import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";


const GetFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState("user");

    fetch(mainURL + "/api/destination/open/favourites/" + user)
    .then((res) => res.json())
    .then((data) => {
        setFavourites(data);
    });

    //{favourites.map((country) => 
      //  <a key={country} href="#" class="list-group-item list-group-item-action list-group-item-primary">{country}</a>
        //)}

    return (

        <div class="sm col-8">
            <br/><br/>

<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action">Favourites</a>

            <ul>
                {favourites.map(function(country, index){
                    return <li key={ index }>{country}</li>;
                  })}
            </ul>

</div>

</div>
    )
}

export default GetFavourites;