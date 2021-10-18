import React from "react"
import { connect } from 'react-redux'

const Leaderboard = (props) =>  {
      const { users } = props
      return (
        Object.keys(users).map( ( id )=> { 

          const user = users[id]
          return (
          <div className='user' key={id}>
                 <div className='user-info'>
                    <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                    />
                    <span>{user.name}</span>
                </div>
                <div className="vl"></div>
                <div className="question-info">  
                    <div className="detials">
                        <p>Number of Questions : {user.questions.length}</p>
                        <p>Number of  Questions : {Object.keys(user.answers).length}</p>
                        <p>Total Score : {user.score}</p>
                    </div>
                </div>
          </div>
      
        )})
      )
}

const geneateUserScore = (users) => {
    const usersScore ={}
    Object.keys(users).forEach((id) => {
        const user = users[id]
        user.score = Object.keys(user.answers).length + user.questions.length
        usersScore[id] = user
      })
      return usersScore
}
const sortUsers = (users) => {
    const usersScore = geneateUserScore(users)
    const sortedUsers = {}
    Object.keys(usersScore)
      .map(id => usersScore[id])
      .sort((a, b) => (b.score - a.score))
    .forEach(user => {
      sortedUsers[user.id] = user;
    })
    return sortedUsers

}

const mapStatToProps = ({users}) => {
    return {
      users: sortUsers(users) 
    }
}
export default connect(mapStatToProps)(Leaderboard)