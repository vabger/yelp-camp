import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

function CampgroundHome({ campground }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {campground && (
        <Card style={{ width: "30rem" }}>
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
            <Button href="#">Show</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CampgroundHome;
