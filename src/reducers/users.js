import { RECEIVE_USERS, USER_ADD_QUESTION, USER_ANSWER_QUESTION } from "../actions/users"

export function users(users = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...users,
                ...action.users
            }
        case USER_ADD_QUESTION:{
            const { authedUser, qid } = action.question
            return {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions :[
                        ...users[authedUser].questions,
                        qid,
                    ]
                }
            }
        }
            
        case USER_ANSWER_QUESTION:
            const { authedUser, qid, answer }= action.question
            
            return {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers :{
                        ...users[authedUser].answers,
                        [qid]: {
                            answer,
                        }
                    }
                }
            }
        default:
            return users
    }
}