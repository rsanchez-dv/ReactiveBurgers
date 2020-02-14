import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
        ,
        loading:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            // Recalculate price on server
            price: this.props.price,
            customer: {
                name: 'Roberto Sanchez',
                address:{
                    street:'123 Fake St.',
                    zipCode: '90061',
                    country: 'USA',
                },
                email: 'asdf@asdf.com'
            },
            deliveryMethod: 'fastest'
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
    render() {
        let form = (<form>
            <input className={Classes.Input} type="text" name="name" placeholder="Name" />
            <input className={Classes.Input} type="email" name="email" placeholder="Email" />
            <input className={Classes.Input} type="text" name="street" placeholder="Street" />
            <input className={Classes.Input} type="text" name="postal" placeholder="Postal Code" />
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