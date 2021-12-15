import React from 'react'

import "./CampgroundCarousel.css"

import next from "../../icons/right-arrow.png"
import previous from "../../icons/left-arrow.png"

function CampgroundCarousel({ images }) {

    const mapButton = (image, index) => {
        if (index === 0)
            return <button type="button" data-bs-target="#CampgroundCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 0" key={index} />

        return <button type="button" data-bs-target="#CampgroundCarousel" data-bs-slide-to={index} aria-label={`slide ${index}`} key={index} />
    }

    const mapImg = (image, index) => {
        if (index === 0)
            return (<div className="carousel-item active" data-bs-interval="10000" key={index}>
                <img src={image.url} alt="campground" />
            </div>)
        return (<div className="carousel-item" data-bs-interval="2000" key={index}>
            <img src={image.url} alt="campground" />
        </div>)

    }

    return (
        <div id="CampgroundCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {images.map(mapButton)}
            </div>
            <div className="carousel-inner">
                {images.map(mapImg)}
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
