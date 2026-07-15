import React, { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  constructor(props) {
    super(props);

    this.items = [
      { itemname: 'Laptop', price: 45000 },
      { itemname: 'Mobile', price: 20000 },
      { itemname: 'Headphones', price: 2000 },
      { itemname: 'Keyboard', price: 1500 },
      { itemname: 'Mouse', price: 800 }
    ];
  }

  render() {
    return (
      <div>
        <h1>Items Ordered:</h1>

        <table border="1">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            <Cart item={this.items} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default OnlineShopping;