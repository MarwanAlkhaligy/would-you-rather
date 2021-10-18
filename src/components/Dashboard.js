import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'

class Dashboard extends Component {
  state = {
    activeTabIndex: 0,
  }
  handleTabChange = ( data) => {
      this.setState({activeTabIndex: data})
  }
  
  render() {
    const activeTabIndex = this.state.activeTabIndex
    console.log('activeTab : ' ,activeTabIndex)
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <QuestionList activeTab={this.state.activeTabIndex} handleTabChange={this.handleTabChange}/>
      </div>
    )
  }
}
function mapStateToProps ({ questions, users }, {activeIndex, handleTabChange}) {
  return {
    questions,
    users,
    activeIndex, 
    handleTabChange,
  }
}
export default connect(mapStateToProps)(Dashboard)