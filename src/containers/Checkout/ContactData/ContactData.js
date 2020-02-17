import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
       orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                // Default selection
                value: 'fastest'
            }
       },
        loading:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post(`/orders.json`,order)
        .then(response=> {
            this.setState({loading: false,purchasing: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false,purchasing: false});
            console.log('An error has occured');
        });
    }
    checkValidity(value,rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        // Copy from state
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // Since its not a deep copy, copy the rest of the data in orderForm
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // Read from event
        updatedFormElement.value = event.target.value;
        // Run Validations
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // Pass on updated values to updatedOrderForm
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement)
        this.setState({orderForm: updatedOrderForm});
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
export default ContactData;