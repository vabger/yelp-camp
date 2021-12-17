import React from 'react'

import "./DetailsPanel.css"

function DetailsPanel({ campground }) {
    return (
        <div className="detailsCard card">
            <div class="card-body">
                <h1 class="card-title">{campground.title}</h1>
                <p class="card-text">{campground.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{`$${campground.price}/night`}</li>
                <li class="list-group-item">{campground.location}</li>
            </ul>
            <button className='btn btn-primary btn-lg m-sm-1'>Book Now!</button>
        </div>
    )
}

export default DetailsPanel
