import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import "./Location.css"
import { useHistory } from "react-router-dom"

export const LocationList = () => {
  const { locations, getLocations } = useContext(LocationContext)
  const history = useHistory()

  useEffect(() => {
    getLocations()
  }, [])


  return (
    <div className="locations">
      <button onClick={() => {history.push("/locations/create")}}>
            Add Location
        </button>
      {locations.map(location => {
          return <LocationCard key={location.id} location={location} />
        })}
    </div>
  )
}