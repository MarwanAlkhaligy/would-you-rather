import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export function questions(questions ={}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions

        case ADD_QUESTION:
            return {
                ...questions,
                [action.question.id] : action.question
            }
        case ANSWER_QUESTION:
            const { authedUser, qid, answer } = action.payload
            const targetQuestionAnswer = questions[qid][answer]
            return {
                ...questions,
                [qid] : {
                  ...questions[qid],
                  [answer] :{
                      ...targetQuestionAnswer,
                      votes: [...targetQuestionAnswer.votes, authedUser]
                  }
                }
            }
        default: 
            return questions
        
    }
}