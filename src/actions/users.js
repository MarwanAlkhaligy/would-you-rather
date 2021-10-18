export const RECEIVE_USERS = 'RECECIVE_USERS'
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addUserQuestion({authedUser, qid}) {
    return {
        type: USER_ADD_QUESTION,
        question: {authedUser, qid},
    }
}
export function userAnswerQuestion({ authedUser, qid, answer }) {
    return {
        type: USER_ANSWER_QUESTION,
        question: {authedUser, qid, answer}
    }
}