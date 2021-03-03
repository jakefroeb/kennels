import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationDetail = () => {
    const {getLocationById} = useContext(LocationContext)
    const [location, setLocation] = useState({})
    const {locationId} = useParams()
    const history = useHistory()

    useEffect(()=>{
        getLocationById(locationId)
        .then(res =>{
            setLocation(res)
        })
    },[])

    return (
        <div className="location">
            <h3 className="location_name">{location.name}</h3>
            <div className="location_address">{location.address}</div>
            <h4>Employees</h4>
            <ul>
                {location.employees?.map(employee => <li key={employee.id}>{employee.name}</li>)}
            </ul>
            <h4>Current Residents</h4>
            <ul>
                {location.animals?.map(animal => <li key ={animal.id}>{animal.name}</li>)}
            </ul>
            <button onClick={() => {
                history.push(`/locations/edit/${location.id}`)
            }}>Edit</button>
        </div>
    )
}