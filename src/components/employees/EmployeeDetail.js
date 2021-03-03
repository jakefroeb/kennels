import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

export const EmployeeDetail = () => {
    const {getEmployeeById} = useContext(EmployeeContext)

    const [employee, setEmployee] = useState({})
    const {employeeId} = useParams()
    const history = useHistory()

    useEffect(()=>{
        getEmployeeById(employeeId)
        .then((res)=>{
            setEmployee(res)
        })
    },[])

    return (
        <section className="employee">
          <h3 className="employee__name">{employee.name}</h3>
          {/* What's up with the question mark???? See below.*/}
          <div className="employee__locationName">Location: {employee.location?.name}</div>
          <div className="employee__locationAddress">Address: {employee.location?.address}</div>
          <button onClick= {()=>{
              history.push(`/employees/edit/${employee.id}`)
          }}>Edit</button>
        </section>
      )
}