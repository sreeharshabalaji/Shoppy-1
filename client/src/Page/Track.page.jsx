// Libraries
import React, { useEffect, useState } from "react";
import { Container, Card, Col, CardBody, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// Components
import CustomSpinner from "../components/CustomSpinner/CustomSpinner.component";

// Redux action
import { getTrackingData } from "../redux/reducer/Orders/Orders.action";

const TrackOrder = () => {
  const [trackingInfo, setTrackingInfo] = useState({});

  // Auth0 hook to redirect for login/ register page
  const { loginWithRedirect } = useAuth0();

  const reduxState = useSelector(({ customer }) => ({ customer }));

  // Get shipping id
  const { shippingId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // if the user is not authenticated then redirect to login page
    if (!reduxState.customer.customerID) {
      loginWithRedirect();
    }
  }, []);

  useEffect(() => {
    const getTrackingDataAction = async () => {
      const trackingData = await dispatch(
        getTrackingData(reduxState.customer.customerID, shippingId)
      );
      setTrackingInfo(trackingData.payload);
    };
    getTrackingDataAction();
  }, []);

  return (
    <>
      <Container className="pt-6">
        <div className=" d-md-flex flex-row-reverse justify-content-between align-items-center">
          <Col>
            <img
              src="https://assets-ouch.icons8.com/free-download/49/0fec1730-5b29-422e-b92e-749932c6cb95.png?filename=pablo-866.png"
              alt="shipping image"
              className="img-fluid"
            />
          </Col>
          <Col>
            <Card className="shadow">
              <CardBody>
                <div className="d-flex flex-row-reverse justify-content-between align-items-center">
                  <div className="d-flex">
                    <Spinner type="grow" color="warning" size="sm" />
                    <h6 className="ml-1 text-warning">Shipping</h6>
                  </div>

                  <h4>
                    Order placed on{" "}
                    {moment(trackingInfo.shippingDate).format("MMM DD")}
                  </h4>
                </div>
                <h1 className="text-primary">{trackingInfo.productName}</h1>
                <p className="mt--2">{trackingInfo.productDescription}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className=" font-weight-800 text-primary">
                    ₹ {trackingInfo.price}
                  </h1>
                  <h4 className=" font-weight-800">
                    Quantity: {trackingInfo.quantity}
                  </h4>
                </div>
                <Card className="bg-default">
                  <CardBody>
                    <h3 className="text-white">Shipping Address</h3>
                    <p className="text-white">{trackingInfo.shippingAddress}</p>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default TrackOrder;
