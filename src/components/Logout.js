import React, {Component} from 'react'
import {removeAuthedUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

class Logout extends Component {
    state = {
        redirect: false
     }

    componentDidMount () {
        // to wait a moment for user to logout
            setTimeout(() =>  {
                 this.setState({redirect: true})
                 this.props.dispatch(removeAuthedUser())
            }, 1000) 
    }

    render() {
        return (
            <div> 
                <h1> Logging Out</h1> 
                <p>Thank you for your visit  :) </p>
                { (this.state.redirect ) &&
                    <Redirect to='/'/>
                }
            </div>
        )
    }
}
export default connect()(Logout)