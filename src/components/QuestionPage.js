import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Radio } from 'semantic-ui-react'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    selectedValue: null,
  }
  handleQuestion = (e, data) => {
    this.setState({selectedValue: data.value})
  }
  handleSubmit = (e, qid, authedUser) => {
    e.preventDefault()
    
    const selectedValue = this.state.selectedValue

    if (selectedValue !== null) {
      this.props.dispatch(handleAnswerQuestion({ authedUser, qid, answer: selectedValue }))
    }
    
    
  }
  render() {
    const  {authedUser, question, user}  = this.props
    if(user === null) {
      return <Redirect to='/404'/>
    }

    const answeredOptionOne = question.optionOne.votes.includes(authedUser) 
    const answeredOptionTwo = question.optionTwo.votes.includes(authedUser) 
    
    if (answeredOptionOne ||  answeredOptionTwo) {
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length 

        const firstOptionVotes = Math.round(question.optionOne.votes.length / totalVotes * 100)
        const secondOptionVotes = Math.round(question.optionTwo.votes.length / totalVotes * 100)
         // to show  answer of the user and percentage  component
        return (
          <div className='question' key={question.id}>
            <div className='user-info user-contain'>
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className='avatar'
                />
                <span>{user.name}</span>
            </div>
            <div class="vl_two"></div>
            <div className='question-info progress-container'>
              <div >
                  <h5>Would you rather ?</h5>
                  <div className='progress'>
                    <p>{question.optionOne.text}</p>
                    <progress id="file" max="100" value={firstOptionVotes}></progress>
                    <div className="progress">
                        {firstOptionVotes}%  {" "} { question.optionOne.votes.length} of {totalVotes}
                        {(answeredOptionOne === true) && (<h6 stye={{color : 'black'}}>Your answer</h6>)} 
                    </div>
                  </div>
                  <div className='progress'>
                    <p>{question.optionTwo.text}</p>
                    <progress id="file" max="100" value={secondOptionVotes}>
                    </progress> 
                    <div className="progress">
                        {secondOptionVotes}%  {" "} {question.optionTwo.votes.length} of {totalVotes} 
                        {(answeredOptionTwo === true) && (<h6>Your answer</h6>)}    
                    </div>
                </div>
              </div> 
            </div>  
          </div>
        )
    }
    // to show submit answer component
    return (
           <div className='question' key={question.id}>
              <div className='user-info'>
                  <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className='avatar'
                  />
                  <span>{user.name}</span>
              </div>
              <div class="vl"></div>
              <div className='radio-info'>
                  <h3>Would you rather ?</h3>
                  <div className='Radio-container'>
                      <div className='Radio-options'>
                          <Radio
                              label={question.optionOne.text}
                              name='radioGroup'
                              value='optionOne'
                              onChange={this.handleQuestion}
                              />
                            or{" "}
                          <Radio
                            label={question.optionTwo.text}
                            name='radioGroup'
                            value='optionTwo'
                            onChange={this.handleQuestion}
                          />
                      </div> 
                  </div>
                  <button  className='sumbitBtn'onClick={ (e) => {this.handleSubmit(e, question.id, authedUser)}}>
                          Submit
                  </button>
            </div>
                         
          </div>  
    )
  }
}

function mapStateToProps ({ authedUser, questions, users}, props) {
  const { id } = props.match.params
  const question = questions[id] 
  const user = question? users[question.author] : null 

  return {
    question,
    authedUser,
    user,
  }
}

export default connect(mapStateToProps)(QuestionPage)