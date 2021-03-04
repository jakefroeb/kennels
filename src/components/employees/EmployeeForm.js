import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';
import { EmployeeContext} from "./EmployeeProvider";

export const EmployeeForm = () => {
    const {addEmployee, getEmployeeById, updateEmployee} = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    const [isLoading, setIsLoading] = useState(true)
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({
      name: "",
      locationId: 0
    });
    const history = useHistory();

    useEffect(() => {
      getLocations()
      .then(()=>{
        if(employeeId){
          getEmployeeById(employeeId)
          .then(employee => {
            setEmployee(employee)
            setIsLoading(false)
          })
          
        }else{
          setIsLoading(false)
        }
      })
    }, [])

    const handleControlledInputChange = (event) => {
      const newEmployee = { ...employee }
      newEmployee[event.target.id] = event.target.value
      setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
      event.preventDefault()
      employee.locationId = parseInt(employee.locationId)

      if (employee.locationId === 0) {
        window.alert("Please select a location")
      } else {
        if(employeeId){
          updateEmployee({name: employee.name,
                          locationId: employee.locationId,
                          id: employee.id})
          .then(()=> history.push(`/employees/detail/${employee.id}`))
        }else{
          addEmployee({name: employee.name,
                      locationId: employee.locationId})
          .then(() => history.push("/employees"))
        }
      }
    }

    return (
      <form className="employeeForm">
          <h2 className="employeeForm__title">New Employee</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Employee name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select value={employee.locationId} onChange={handleControlledInputChange} name="locationId" id="locationId" className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            disabled= {isLoading}
            onClick={handleClickSaveEmployee}>
            {employeeId ? "Edit Employee" : "Save Employee"}
          </button>
      </form>
    )
}