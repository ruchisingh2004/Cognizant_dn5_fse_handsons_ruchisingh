import React from 'react';
import officeImage from './office.jpg';

function App() {
  const element = 'Office Space';

  const officeSpaces = [
    {
      Name: 'DBS',
      Rent: 50000,
      Address: 'Chennai'
    },
    {
      Name: 'Regus',
      Rent: 65000,
      Address: 'Bangalore'
    },
    {
      Name: 'WeWork',
      Rent: 75000,
      Address: 'Hyderabad'
    }
  ];

  return (
    <div style={{ marginLeft: '100px', marginTop: '50px' }}>
      <h1>{element}, at Affordable Range</h1>

      <img
        src={officeImage}
        width="25%"
        height="25%"
        alt="Office Space"
      />

      {officeSpaces.map((item, index) => {
        const rentColor = item.Rent < 60000 ? 'red' : 'green';

        return (
          <div key={index}>
            <h1>Name: {item.Name}</h1>

            <h3 style={{ color: rentColor }}>
              Rent: Rs. {item.Rent}
            </h3>

            <h3>Address: {item.Address}</h3>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
