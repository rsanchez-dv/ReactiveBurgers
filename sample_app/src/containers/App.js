import React, { Component } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
class App extends Component {
  constructor(props){
      super(props)
      console.log('Thisi s inside constructor')
  }
  componentWillMount(){
    console.log('This is mount')
  }
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
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/>
    }
   
    return (
        <WithClass classes={App}>
        <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}
        </WithClass>
    );
  }
}

export default Radium(App);
