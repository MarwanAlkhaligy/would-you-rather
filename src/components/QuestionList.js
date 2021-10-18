import React, {Component} from 'react'
import { connect } from 'react-redux' 
import Question from './Question'
import {  Label } from "semantic-ui-react" //, Menu, Tab, Tabs
import  {Tabs, Tab, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

class QuestionList extends Component {
    
    handleTab = (data ) => {
        this.props.handleTabChange( data)
    }
    getAnsweredQuestions = (authedUser,  questions, users) => {
        const answeredQuestions = Object.keys(questions).filter(  questionID => (
            questions[questionID].optionOne.votes.includes(authedUser) || 
            questions[questionID].optionTwo.votes.includes(authedUser))
            ).map(
                (qid) => {
                  return <Question key={qid} id={qid}/>
            })
        
        return answeredQuestions.length
        ? {
            count: answeredQuestions.length,
            elements: <div className='question-container'>{answeredQuestions}</div>,
        }
        : { count: answeredQuestions.length};
            
    }

    getUnansweredQuestions = (authedUser,  questions, users) => {
        const unansweredQuestions = Object.keys(questions).filter(  ( questionID ) => (
            !questions[questionID].optionOne.votes.includes(authedUser) &&
            !questions[questionID].optionTwo.votes.includes(authedUser))
            ).map(
                (qid) => {
                  return (<Question key={qid} id={qid}/>)
            })
        return unansweredQuestions.length
        ? {
            count: unansweredQuestions.length,
            elements: <div className='question-container'>{unansweredQuestions}</div>,
        }
        : { count: unansweredQuestions.length};      
    }

    render() {
        const {questions, users, authedUser } = this.props

        const answeredQuestions = this.getAnsweredQuestions(authedUser,  questions, users)
        const unansweredQuestions = this.getUnansweredQuestions(authedUser,  questions, users)

            return (
                <div className='question-container'>
                    <div className='tabs-container'>
                        <Tabs   selectedIndex={this.props.activeTab} onSelect={(data ) => this.handleTab(data)}>
                            <TabList>
                                <Tab>
                                    <div>
                                    Unanswered Questions<Label> {unansweredQuestions.count}</Label>
                                    </div>
                                </Tab>
                                <Tab>
                                    <div>
                                        Answered Questions<Label>{answeredQuestions.count}</Label>
                                    </div>
                                </Tab>
                            </TabList>
                            <TabPanel >
                                {unansweredQuestions.elements}
                            </TabPanel>
                            <TabPanel >
                                {answeredQuestions.elements}
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div></div>
                    
                </div>
            ); 
    }
}
const returnSortedQuestion =  (questionIds, question) => {
    const questionsSorted = {}

    questionIds.forEach(question => {
        questionsSorted[question.id] = question;
      });
    return questionsSorted;
}
const sortQuestions = (questions) => {
    const questionIds =  Object.keys(questions)
                               .map(key => questions[key])
                               .sort((a, b) => b.timestamp - a.timestamp)
                               
    return returnSortedQuestion(questionIds, questions)
      
  };
  
  function mapStateToProps ({ questions, users, authedUser }, {activeIndex,handleTabChange}) {
    return {
      questions : sortQuestions(questions),
      users,
      authedUser,
      activeIndex,
      handleTabChange,
    }
  }
export default connect(mapStateToProps)(QuestionList)