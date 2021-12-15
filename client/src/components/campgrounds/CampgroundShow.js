import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getCampgroundById } from '../../redux-store/actions/campgroundsActions'

import { checkIfLoading } from '../../redux-store/selectors/uiSelectors'

import { useParams } from 'react-router-dom'
import CampgroundCarousel from '../CampgroundCarousel/CampgroundCarousel'
import DetailsPanel from '../DetailsPanel/DetailsPanel'

import "./CampgroundShow.css"

function CampgroundShow() {

    const dispatch = useDispatch();

    const { campgroundDetails } = useSelector((state) => state.campgrounds)

    const { id } = useParams();

    useEffect(() => {
        dispatch(getCampgroundById(id))
    }, [dispatch, id])

    return (
        <div className='show'>
            {campgroundDetails && <CampgroundCarousel images={campgroundDetails.images} />}
            {campgroundDetails && <DetailsPanel campground={campgroundDetails} />}
        </div>

    )
}

export default CampgroundShow
