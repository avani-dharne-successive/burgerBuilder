import React, { Component } from "react";
import { Route } from "react-router-dom";

import OrderSummary from "../../components/Order/OrderSummary/OrderSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    const ingredients = {};
    let totalPrice = 0;
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      if (param[0] === "price") {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  continueCheckoutHandler = () => {
    this.props.history.push("/checkout/userInfo");
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <OrderSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.cancelCheckoutHandler}
          checkoutContinued={this.continueCheckoutHandler}
        />
        <Route
          path="/checkout/userInfo"
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
