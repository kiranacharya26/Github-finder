import './App.css';
import React, {Component} from 'react'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/search'
import Alert from './components/layouts/Alert'

class App extends Component {
  state = {
    users : [],
    loading: false,
    alert: null
  }
  async componentDidMount(){
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({users:res.data, loading:false})
  }

  //search github users
  searchUsers = async text =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({users:res.data.items, loading:false})
  }


  //clear users func
  clearUsers = () => this.setState({users: [], loading:false})

  //setalert
  setAlert = (msg, type) => {
    this.setState({alert : {msg,type}})

    setTimeout(() => this.setState({alert: null}), 3000);
  }

  render(){
   const { users,loading } = this.state
    return (
      <div className="App">
        <Alert alert={this.state.alert}/>
        <Navbar  />
        <div className="container">
          <Search searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} showClear = 
          {users.length > 0 ? true : false}
          setAlert = {this.setAlert}
          />
          <Users users={users} loading = {loading}/>
        </div>
        
      </div>
    );
  }
  }
 

export default App;
