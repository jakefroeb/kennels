import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./Location.css"
import { useHistory } from 'react-router-dom';

export const LocationForm = () => {
    const {addLocation} = useContext(LocationContext)
    const [location, setLocation] = useState({
      name: "",
      address: "",
    });
    const history = useHistory();

    const handleControlledInputChange = (event) => {
      const newLocation = { ...location }
      newLocation[event.target.id] = event.target.value
      setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
      event.preventDefault()
        addLocation(location)
        .then(() => history.push("/locations"))
      }
    

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required className="form-control" placeholder="Location address" value={location.address}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveLocation}>
            Save Location
          </button>
      </form>
    )
}