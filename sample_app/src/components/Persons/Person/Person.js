import React, {Component} from 'react';
import './Person.css'
import WithClass from '../../../hoc/WithClass'

class Person extends Component {
  render(){
    return (
      <WithClass >
<p onClick={this.props.click}> I am {this.props.name},lol</p>
          <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </WithClass>
    )
  }
}

export default Person;
