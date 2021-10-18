import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'




class NewQuestion extends Component {
    state = {
        firstOption: '',
        secondOption: '',
        redirect: false,
    }

    handleChangeFirstOption = ( e ) => {
        const text = e.target.value
        this.setState(() => ({firstOption: text }))
    }
    handleChangeSecondOption = ( e ) => {
        this.setState(() => ({ secondOption: e.target.value })) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('State : ', this.state)
        const author = this.props.authedUser
        
        const {firstOption, secondOption} = this.state

        if (firstOption !== '' && secondOption !== '') {
            this.props.dispatch(handleAddQuestion({optionOneText: firstOption, optionTwoText: secondOption, author}))
            console.log('we are here so dont worry')

            this.setState({ firstOption:'', secondOption:'',  redirect : true, })
        }
        
    }
    render() {
        const redirect  = this.state.redirect
        
        if (redirect === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='newQuestion-container'>
                <h1 className='center'>Compose new Question</h1>
                <br/>
                <form className='new-question' onSubmit={this.handleSubmit}>
                <input
                    type='text' 
                    value={this.state.firstOption} 
                    onChange= {(e)=> {this.handleChangeFirstOption(e)}}
                 />
                 <br/>
                <input 
                    type='text' 
                    value={this.state.secondOption}
                    onChange={(e)=> {this.handleChangeSecondOption(e)}}
                />
                <button
                    className='btn'
                    type='submit'
                    
                >
                    Submit
                </button>
                </form>
            </div>
            
        )
       
   }
}
const mapStateToProps = ({authedUser,dispatch}) => {
    return {
        authedUser,
        dispatch,
    }
}
export default connect(mapStateToProps)(NewQuestion)