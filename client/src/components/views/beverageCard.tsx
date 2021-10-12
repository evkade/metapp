import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// todo: center add to menu / remove to menu button
// todo: onclick Card shows info about it

/* This component is a Card for one beverage used when the user scrolls between beverages */
export const BeverageCard = ({
  beverage,
  isInMenu,
  addToMenu,
  removeFromMenu,
}) => {
    console.log(beverage, isInMenu);
  return (
    <Card className="m-5 shadow">
      <Row>
        <Col>
          <Card.Img src="/postboot/assets/img/thumbnail.jpg" />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title as="h1">{beverage.name}</Card.Title>
            <Card.Text as="h4">{"Price: " + beverage.price}</Card.Text>
          </Card.Body>
        </Col>
        <Col>
          {isInMenu ? (
            <Button
              className="align-self-center"
              onClick={() => removeFromMenu(beverage)}
            >
                Remove from Menu
            </Button>
          ) : (
            <Button
              className="align-self-center"
              onClick={() => addToMenu(beverage)}
            >
              Add to Menu
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};
