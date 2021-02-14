import './App.css';
import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import axios from 'axios'
import Search from './components/users/search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'

class App extends Component {
  state = {
    users : [],
    user: {},
    loading: false,
    repos:[],
    alert: null
  }
  // async componentDidMount(){
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
  //   this.setState({users:res.data, loading:false})
  // }

  //search github users
  searchUsers = async text =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({users:res.data.items, loading:false})
  }
//search single user
getUser = async username => {
  this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({user:res.data, loading:false})
}

//get single user repo
getUserRepos = async username => {
  this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({repos:res.data, loading:false})
}

  //clear users func
  clearUsers = () => this.setState({users: [], loading:false})

  //setalert
  setAlert = (msg, type) => {
    this.setState({alert : {msg,type}})

    setTimeout(() => this.setState({alert: null}), 3000);
  }

  render(){
   const { users,loading, user , repos} = this.state
    return(
      <Router>
        <div className="App">
        <Navbar  />
        <div className="container">
        <Alert alert={this.state.alert}/>
        <Switch>
          <Route exact path='/' render= {props =>(

            <Fragment>
                  <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} showClear = 
                  {users.length > 0 ? true : false}
                  setAlert = {this.setAlert}
                  />
                  <Users users={users} loading = {loading}/>
            </Fragment>
            )}/>
            <Route exact path='/about'component = {About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser = {this.getUser} getUserRepos = {this.getUserRepos} repos={repos} user ={user}  loading ={loading}/>
            )}/>
          </Switch>
        </div>
        </div>
      </Router>
      
    );
  }
  }
 

export default App;
