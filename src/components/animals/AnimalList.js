import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"
import { useHistory } from "react-router-dom"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const history = useHistory()

    useEffect(() => {
        getCustomers()
        .then(getAnimals)
    }, [])


    return (
        <div className="animals">
            <button onClick={() => {history.push("/animals/create")}}>
            Add Animal
        </button>
            {animals.map(animal => {
                const owner = customers.find(c => c.id === animal.customerId)

                return <AnimalCard key={animal.id}
                        customer={owner}
                        animal={animal} />
            })}
        </div>
    )
}