import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/**
* This function loops through all the numbers and processes them.
**/
const checkWinningTicket = (numbers) => {
    let winningTickets = {};

    //loop through each number and process it.
    numbers.forEach((number) => {
        try {
            winningTickets[number] = processNumber(number);
        } catch (error) {
            console.log(number + '" is invalid: ' + error.message);
        }
    });

    return winningTickets;
}

/**
* This function will process a lotto ticket number
**/
const processNumber = (number) => {

    const minimumLength = 7;
    //if the string is less than the minimum length, throw an error
    if (number.length < minimumLength) {
        throw new Error('string must be atleast 7 digits');
    }

    let ticketList = [],
        state = '';

    /**
    * this function adds to the list
    **/
    const addToTicket = (currentValue) => {
        if (state) {
            addDoubleDigitNumber(currentValue);
        } else {
            addSingleDigitNumber(currentValue);
        }
    }

    /**
    * This function adds double digit numbers.
    **/
    const addDoubleDigitNumber = (currentValue) => {
        let number = parseInt(state + currentValue);

        if (ticketList.includes(number)) {
            addSingleDigitNumber(state);
            if (currentValue > '5') {
                addSingleDigitNumber(currentValue)
            } else {
                state = currentValue;
            }
        } else {
            ticketList.push(number);
            state = '';
        }
    }

    /**
    * This function adds single digit numbers.
    **/
    const addSingleDigitNumber = (currentValue) => {
        let number = parseInt(currentValue);

        if (!ticketList.includes(number)) {
            ticketList.push(number);
        }
        state = '';
    }

    number.split('').forEach((numString, i) => {
        let currentValue = numString;

        if (state) {
            addToTicket(currentValue);
        } else if (currentValue === '0') {
            return false;
        } else if (currentValue > '5') {
            addToTicket(currentValue);
        } else if (number.length - i === ( minimumLength - ticketList.length)) {
            addToTicket(currentValue);
        }  else {
            state = currentValue;
        }
    })

    if (ticketList.length < minimumLength) {
        throw new Error('insufficient numbers');
    } else if (ticketList.length > minimumLength) {
        throw new Error('too many numbers');
    }

    return ticketList;
}


class App extends Component {

    render() {
        const ticketNumbers = [
          '569815571556',
          '4938532894754',
          '1234567',
          '76543021',
          '472844278465445'
        ],
        validTickets = checkWinningTicket(ticketNumbers);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Lotto Ticket by Uncle Morty</h1>
                </header>
                <p className="App-intro">
                    Lotto tickets: {ticketNumbers.join()}
                </p>
                <div className="App-intro">
                    Valid ticket numbers:
                    {validTickets && Object.keys(validTickets).map((ticket,i) => {
                        return <p key={i}>{ticket}: {validTickets[ticket].join()}</p>;
                    })}
                </div>
            </div>
        );
    }
}

export default App;
