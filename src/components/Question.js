import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


 class Question extends Component {
    toQuestion = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
      }
     render() {
        const question = this.props.question
     
        const user = this.props.user

         if (question === null) {
            return <p>This Question doesn't exist</p>
         }
      
         return (
            <div className='question'>
                <div className='user-info'>
                    <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                    />
                    <span>{user.name}</span>
                </div>
                <div class="vl"></div>
                <div className='question-info'>
                    <h3>Would you rather</h3>
                    <div><p>{question.optionOne.text} or{"   "}{ question.optionTwo.text}?</p></div>
                   
                    <div className='question-button'> 
                        <Link to={`/questions/${question.id}`} >
                            <button >
                                View Poll
                            </button>
                        </Link>
                    </div>
                </div>
           </div>
         )


     }
 }
 
            
const mapStateToProps = ({users, questions} ,{id }) => {
    const question = questions[id]
    const user = question ? users[question.author] : null
    return {
        question,
        user,
    }
}
export default connect(mapStateToProps)(Question)