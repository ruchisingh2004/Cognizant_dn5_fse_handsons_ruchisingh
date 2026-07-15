import React from 'react';

const IndianTeam = [
  'Sachin1',
  'Dhoni2',
  'Virat3',
  'Rohit4',
  'Yuvraj5',
  'Raina6'
];

const T20Players = [
  'First Player',
  'Second Player',
  'Third Player'
];

const RanjiTrophyPlayers = [
  'Fourth Player',
  'Fifth Player',
  'Sixth Player'
];

const IndianPlayers = [
  ...T20Players,
  ...RanjiTrophyPlayers
];

function OddPlayers([first, , third, , fifth]) {
  return (
    <div>
      <h1>Odd Players</h1>

      <ul>
        <li>First: {first}</li>
        <li>Third: {third}</li>
        <li>Fifth: {fifth}</li>
      </ul>
    </div>
  );
}

function EvenPlayers([, second, , fourth, , sixth]) {
  return (
    <div>
      <h1>Even Players</h1>

      <ul>
        <li>Second: {second}</li>
        <li>Fourth: {fourth}</li>
        <li>Sixth: {sixth}</li>
      </ul>
    </div>
  );
}

function IndianPlayerDetails() {
  return (
    <div>
      {OddPlayers(IndianTeam)}

      <hr />

      {EvenPlayers(IndianTeam)}

      <hr />

      <h1>List of Indian Players Merged:</h1>

      <ul>
        {IndianPlayers.map((player, index) => (
          <li key={index}>Mr. {player}</li>
        ))}
      </ul>
    </div>
  );
}

export default IndianPlayerDetails;