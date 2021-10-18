import { saveQuestion, saveQuestionAnswer} from '../utils/api'
import {addUserQuestion, userAnswerQuestion} from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions,
    }
}
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}
export function handleAddQuestion({optionOneText, optionTwoText, author}) {
    return ( dispatch ) => {

        dispatch(showLoading())
  
        return saveQuestion({optionOneText, optionTwoText, author}).then (
            (question) => {

                dispatch(addQuestion(question))
                dispatch(addUserQuestion({ authedUser: author , qid: question.id }))
            } 
        ).then(() => dispatch(hideLoading()))
        .catch((error) => {console.log('console error : ',error)})
    }
}

function answerQuestion({ authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        payload: {
            authedUser,
            qid,
            answer,
        }
    }
}
export function handleAnswerQuestion({ authedUser, qid, answer }) {
    return (dispatch) => {
    
        dispatch(showLoading())
        
        return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(answerQuestion({ authedUser, qid, answer }))
            dispatch(userAnswerQuestion({ authedUser, qid, answer })) 
        }).then(() => dispatch(hideLoading())).catch((error)=> {console.log('error ', error)})
        .catch((error) => {
            console.log('error', error)
        })
    }
}