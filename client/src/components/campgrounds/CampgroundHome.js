import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { Link } from "react-router-dom"

import "./CampgroundHome.css"

function CampgroundHome({ campground }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {campground && (
        <Card className="homeCard">
          <Card.Img variant="top" src={campground.images[0].url} />
          <Card.Body>
            <Card.Title>{campground.title}</Card.Title>
            <Card.Text>
              {campground.description.slice(0, 300) + "...."}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{campground.location}</ListGroupItem>
            <ListGroupItem>{"$" + campground.price}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Link className="btn btn-primary" to={"/campgrounds/" + campground._id}>Show</Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CampgroundHome;
