import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animals/AnimalProvider"
import { AnimalList } from "./animals/AnimalList"
import { CustomerProvider } from "./customers/CustomerProvider"
import { EmployeeProvider } from "./employees/EmployeeProvider"
import { LocationProvider } from "./locations/LocationProvider"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"
import { LocationList } from "./locations/LocationList"
import { AnimalForm } from "./animals/AnimalForm"
import {EmployeeForm} from "./employees/EmployeeForm"
import { LocationForm } from "./locations/LocationForm"
import { AnimalDetail } from "./animals/AnimalDetail"
import { EmployeeDetail } from "./employees/EmployeeDetail"
import { LocationDetail } from "./locations/LocationDetail"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route>
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
                <LocationProvider>
                    <Route exact path="/employees/create">
                        <EmployeeForm/>
                    </Route>
                    <Route exact path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm/>
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route exact path="/locations/create">
                    <LocationForm />
                </Route>
                <Route exact path="/locations/edit/:locationId(\d+)">
                    <LocationForm/>
                </Route>
            </LocationProvider>
            <AnimalProvider>
                <Route exact path="/animals/detail/:animalId(\d+)">
		            <AnimalDetail/>
	            </Route>
            </AnimalProvider>
            <EmployeeProvider>
                <Route exact path="/employees/detail/:employeeId(\d+)">
                    <EmployeeDetail />
                </Route>
            </EmployeeProvider>
            <LocationProvider>
                <Route exact path="/locations/detail/:locationId(\d+)">
                    <LocationDetail/>
                </Route>
            </LocationProvider>
            <LocationProvider>
                <CustomerProvider>
                    <AnimalProvider>
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </AnimalProvider>
                </CustomerProvider>
            </LocationProvider>
        </>
    )
}