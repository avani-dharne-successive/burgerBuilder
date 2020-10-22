import React, { Component } from "react";
import Order from "../../components/Order/Order";

import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    let fetchedOrders = [];
    axios.get("/orders.json").then((res) => {
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }

      console.log(fetchedOrders);

      this.setState({ loading: false, orders: fetchedOrders });
    });
  }

  render() {
    let orders = this.state.orders.map((f) => {
      return (
        <Order key={f.id} ingredients={f.ingredients} price={f.totalPrice} />
      );
    });

    return <div>{orders}</div>;
  }
}

export default Orders;
