import React from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
    const classes = [];
    let btnClass = '';

    if(props.showPersons){
        btnClass = classes.Red;
        console.log('hello')
    }
    
    if(props.persons.length <= 2){
      classes.push('red');
    }
    if(props.persons.length <=1){
      classes.push('bold')
    }
    return (
        <div className={classes.Cockpit}>
            <h1>Hi, react here</h1>
            <p className={classes.join(' ')}>This is a message</p>
            <button 
            className={btnClass}
            onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;
