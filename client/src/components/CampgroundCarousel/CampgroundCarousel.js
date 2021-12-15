import React from 'react'

import "./CampgroundCarousel.css"

import next from "../../icons/right-arrow.png"
import previous from "../../icons/left-arrow.png"

function CampgroundCarousel({ images }) {
    return (
        <div id="CampgroundCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#CampgroundCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#CampgroundCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#CampgroundCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img src={images[0].url} alt="first" />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={images[1].url} alt="second" />
                </div>
                <div className="carousel-item">
                    <img src={images[2].url} alt="third" />
                </div>
            </div>
            <div className="carousel-control-prev" type="button" data-bs-target="#CampgroundCarousel" data-bs-slide="prev">
                <img src={previous} alt='previous' />
            </div>
            <div className="carousel-control-next" type="button" data-bs-target="#CampgroundCarousel" data-bs-slide="next">
                <img src={next} alt='next' />
            </div>
        </div>
    )
}

export default CampgroundCarousel
