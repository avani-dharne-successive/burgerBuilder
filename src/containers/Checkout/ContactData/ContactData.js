import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import classes from "./ContactData.css";
import axios from "../../../axios-orders";

import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    console.log(this.props.ingredients);

    this.setState({
      loading: true,
    });
    let order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        
        this.setState({
          loading: false,
        });

        this.props.history.push("/")
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Your Email" />
        <input type="text" placeholder="Your Address 1" />
        <input type="text" placeholder="Your Address 2" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h1>Enter Your Contact Info</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
