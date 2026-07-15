import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <>
        {this.props.item.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.itemname}</td>
              <td>{item.price}</td>
            </tr>
          );
        })}
      </>
    );
  }
}

export default Cart;