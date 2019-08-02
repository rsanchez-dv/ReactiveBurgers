import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () =>{
        console.log(`Current State: ${this.state.showSideDrawer}`)
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () =>{
        console.log(`Current State: ${this.showSideDrawer}`)
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};  
        })
    }
    render(){
        return(
            <Aux>
    <div>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    </div>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Aux>
        );
    }
} 
export default layout;