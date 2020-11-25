import mainURL from "./settings";
import facade from "./apiFacade";
import LogIn from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";


const GetDestination = () => {

    const [country, setCountry] = useState("");
    const [countryData, setCountryData] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [savedStatus, setSavedStatus] = useState(false);

    const fetchCountryData = (evt) => {
        evt.preventDefault();
        fetch(mainURL + "/api/destination/open/" + country)
        .then((res) => res.json())
        .then((data) => {
            setCountryData(data);
            setFormSubmitted(true);
        });
      }
    
      const onChange = (evt) => {
        setCountry(evt.target.value)
      }

      const saveFavourite = () => {
        var options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              'Accept': 'application/json',
            }
        }
        fetch(mainURL + "/api/destination/open/" + country + "/" + "user", options)
        .then((res) => console.log(res.json()));
    }

    return (
        <div>
        <br/>
        <h2>Write country name:</h2>
        <br/>
        <div className="col-sm-4">
        <form onChange={onChange} >

        <input className="form-control" placeholder="Write here" id="country" />
        <br /> 
        <button className="btn btn-primary" onClick={fetchCountryData}>Submit</button>
        </form>
        </div>
        <br/><br/>

        {formSubmitted && (
            <div class="sm col-8">
            <table class="table">
                <tbody>
                    <tr>
                        <th>Country name</th>
                        <td>{countryData.name}</td>
                    </tr>
                    <tr>
                        <th>Capital</th>
                        <td>{countryData.capital}</td>
                    </tr>
                    <tr>
                        <th>Population</th>
                        <td>{countryData.population}</td>
                    </tr>
                    <tr>
                        <th>Currency</th>
                       <td></td>
                    </tr>
                    <tr>
                        <th>Currency vs USD</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Total COVID-19 cases</th>
                        <td>{countryData.cases}</td>
                    </tr>
                    </tbody>
            </table>

            <button className="btn btn-primary" onClick={saveFavourite}>Save as favourite</button>

            <p>{country} was saved: {savedStatus.valueOf}</p>

            </div>
        )}
            </div>
            
)
}

export default GetDestination;