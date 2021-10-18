import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    handleValueChange = (event) => {
      this.setState({setUser: event.target.value})
      this.props.dispatch(setAuthedUser(event.target.value))
      console.log('state 2')
      
    }
    handleLogin = () => {
        const element = document.getElementById('authed-user-selector').value
        const length = Object.keys(this.props.users).length 
        if ( length !== 0 ) {
          console.log('element :',element)
          this.props.dispatch(setAuthedUser(element))

        }
    }
    render() {
        
        return (
          <div className='controller center newQuestion-container' > 
              <h1 className='center'>Login</h1>
              <div className='container-small'>
                  <select id='authed-user-selector'style={{width:200, height:20,}}>
                  <option value="" disabled>--Please choose a user--</option>
                  {Object.keys(this.props.users).map( (keyName, value) => {
                      return (
                        <option key={keyName} value={keyName}>
                          {this.props.users[keyName].name}
                        </option>
                      );
                    })} 
                  </select>
                  <div>
                    <input type='button' className='signbtn' onClick={this.handleLogin} value='sign in'/>
                  </div>
              </div>
          </div>
        )
      }
}
const mapStateToProps = ({users})=> {
  return {
      users: users,
  }
}
export default connect(mapStateToProps)(Login)