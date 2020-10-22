import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.css";

const OrderSummary = (props) => {
  return (
    <div >
      <h1>We hope it tastes well!</h1>
       <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div> 
       <Button clicked={props.checkoutCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button> 
    </div>
  );
};

export default OrderSummary;
