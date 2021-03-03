import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const {addLocation, updateLocation, getLocationById} = useContext(LocationContext)
    const [location, setLocation] = useState({
      name: "",
      address: "",
    });
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const {locationId} = useParams()

    const handleControlledInputChange = (event) => {
      const newLocation = { ...location }
      newLocation[event.target.id] = event.target.value
      setLocation(newLocation)
    }

    const handleClickSaveLocation = () => {
      setIsLoading(true)
      if(locationId){
        updateLocation(location)
        .then(()=> history.push(`/locations/detail/${location.id}`))
      }else{
        addLocation(location)
        .then(() => history.push("/locations"))
      }
      }
    useEffect(()=>{
      if(locationId){
        getLocationById(locationId)
        .then(location => {
          setLocation(location)
          setIsLoading(false)
        })
      }else{
        setIsLoading(false)
      }
    },[])
    

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
            disabled={isLoading}
            onClick={event =>{
              event.preventDefault()
              handleClickSaveLocation()}}>
            {locationId ? "Edit Location" : "Save Location"}
          </button>
      </form>
    )
}