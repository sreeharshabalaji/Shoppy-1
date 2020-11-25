import React from "react";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg,
} from "reactstrap";

const BestSeller = ({ bestSellers }) => {
  return (
    <>
      <Row className="mt-4">
        <Col md="6">
          <img src={bestSellers.banner} alt="banner" className="img-fluid" />
        </Col>
        <Col md="6">
          <img
            src={bestSellers.banner2}
            alt="banner"
            className="img-fluid mt-3 mt-ld-0"
          />
          <Col>
            <Row className="mt-3 justify-content-between">
              {bestSellers.product.map(({ img, rating, name, price }) => (
                <Card className="p-2 shadow-lg best-seller-card-width">
                  <CardImg top width="100%" src={img} alt="Card image cap" />
                  <span>
                    <i
                      className={classnames("fas fa-star fa-xs text-primary", {
                        "text-gray": rating - 1 < 0,
                      })}
                    />
                    <i
                      className={classnames("fas fa-star fa-xs text-primary", {
                        "text-gray": rating - 2 < 0,
                      })}
                    />
                    <i
                      className={classnames("fas fa-star fa-xs text-primary", {
                        "text-gray": rating - 3 < 0,
                      })}
                    />
                    <i
                      className={classnames("fas fa-star fa-xs text-primary", {
                        "text-gray": rating - 4 < 0,
                      })}
                    />
                    <i
                      className={classnames("fas fa-star fa-xs text-primary", {
                        "text-gray": rating - 5 < 0,
                      })}
                    />
                  </span>
                  <h4 className="mt-1 text-truncate">{name}</h4>
                  <h3 className="mt--1">₹{price}</h3>
                </Card>
              ))}
            </Row>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default BestSeller;