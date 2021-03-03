import './App.css';
import React, {useState, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import axios from 'axios'
import Search from './components/users/search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'

const App = () =>  {
  const [users,setUsers] = useState([])
  const [user,setUser] = useState({})
  const [repos,setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [alert,showAlert] = useState(null)


  // async componentDidMount(){
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
  //   this.setState({users:res.data, loading:false})
  // }

  //search github users
  const searchUsers = async text =>{
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    setUsers(res.data.items)
    setLoading(false)
  }

//search single user
const getUser = async username => {
  setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
   setUser(res.data)
   setLoading(false)
}

//get single user repo
const getUserRepos = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    setRepos(res.data)
    setLoading(false)
}

  //clear users func
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  //setalert
  const setAlert = (msg, type) => {
  
    showAlert({msg,type})
    setTimeout(() => setAlert(null), 3000);
  }

    return(
      <Router>
        <div className="App">
        <Navbar  />
        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render= {props =>(

            <Fragment>
                  <Search searchUsers={searchUsers} 
                  clearUsers={clearUsers} showClear = 
                  {users.length > 0 ? true : false}
                  setAlert = {setAlert}
                  />
                  <Users users={users} loading = {loading}/>
            </Fragment>
            )}/>
            <Route exact path='/about'component = {About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser = {getUser} getUserRepos = {getUserRepos} repos={repos} user ={user}  loading ={loading}/>
            )}/>
          </Switch>
        </div>
        </div>
      </Router>
      
    );
  }
 

export default App;
