import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { id: '1', name:'Max',age:28},
      { id: '2', name:'Manu',age:21},
      { id: '3', name:'Steph',age:26}
    ],
    otherValue: "asdf",
    showPersons: false
  }

  deletePersonHandler = (personIndex) =>{
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }
  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]}

    person.name = event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = person;
    this.setState({
      persons: person
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'grey',
      font: 'inherit',
      border: '1px solid green',
      padding: '8px',
      cursor:'pointer'
    }


    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((personInList,index) =>{
            return <Person
            click={() => this.deletePersonHandler(index)}
             name={personInList.name}
             key={personInList.id}
             changed={(event)=>this.nameChangeHandler(event, personInList.id)}
             />
          })}
        </div>
      );
    }
    
    return (
      <div className="App">
        <h1>Hi, react here</h1>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
