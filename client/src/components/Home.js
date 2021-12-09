import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampgrounds } from "../redux-store/actions/campgroundsActions";

import CampgroundHome from "./campgrounds/CampgroundHome";
import Spinner from "./loading/Spinner";

import { Container } from "react-bootstrap";

import { checkIfLoading } from "../redux-store/selectors/uiSelectors";
import { CAMPGROUNDS_FETCH } from "../redux-store/action-types/campgroundsTypes";

function Home() {
  const dispatch = useDispatch();

  const { campgrounds } = useSelector((state) => state.campgrounds);

  const isLoading = useSelector(checkIfLoading(CAMPGROUNDS_FETCH));

  const [isScrollEnd, setIsScrollEnd] = useState(true);

  useEffect(() => {
    const handleScroll = function (e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;

      let modifier = 200;

      if (currentScroll + modifier > documentHeight) {
        setIsScrollEnd(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (isScrollEnd && !isLoading) {
      dispatch(fetchCampgrounds());
    }
    setIsScrollEnd(false);
  }, [isScrollEnd, dispatch, isLoading]);

  return (
    <Fragment>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {campgrounds &&
          campgrounds.map((campground) => (
            <CampgroundHome campground={campground} />
          ))}
        {isLoading && <Spinner />}
      </Container>
    </Fragment>
  );
}

export default Home;
