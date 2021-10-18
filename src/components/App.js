import '../Css/App.css';
import React , { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Dashboard from './Dashboard';
import QuestionPage from './QuestionPage';
import PageNotFound from './PageNotFound';
import Nav from './Nav';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Logout from './Logout';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
    
    return (
        <div className="App">
            <LoadingBar />


            {(this.props.loading === true) ?  null: (
                this.props.authedUser === null ?  
                <div className='container'>
                   <Router>
                      <Nav />
                      <Login />
                   </Router> 
                </div>:
                  (
                    <Router>
                    <Fragment>
                      <LoadingBar />
                      <div className='container'>
                        <Nav />
                        <Switch>
                              <Route exact path='/' render={() => 
                                <Dashboard />
                                }/>  
                              <Route exact path='/login' component={Login} />
                              <Route exact path='/questions/:id' component={QuestionPage} /> 
                              <Route exact path='/404' component={PageNotFound} /> 
                              <Route path='/add' component={NewQuestion} />
                              <Route path='/leaderboard' component={Leaderboard} />
                              <Route path='/logout' component={Logout} />
                              <Redirect to='/404'/>
                        </Switch>
                      </div>
                    </Fragment>
                  </Router>
                  )  
            )}
        </div>
        )
    }
}
function mapStateToProps ({ users, authedUser}) {
    return {
      loading: users === null,
      authedUser: authedUser,
    }
}
export default connect(mapStateToProps)(App)