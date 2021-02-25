import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">{animal.breed}</div>
        <address className="animal__address">location: {animal.location.name}</address>
        <div className="animal__owner">owner: {customer.name}</div>
    </section>
)