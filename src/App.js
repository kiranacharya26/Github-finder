import './App.css';
import React, {Component} from 'react'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/search'

class App extends Component {
  state = {
    users : [],
    loading: false
  }
  // async componentDidMount(){
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
  //   this.setState({users:res.data, loading:false})
  // }

  //search github users
  searchUsers = async text =>{
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_GITHUB_ID}&client_secret=${process.env.REACT_GITHUB_SECRET_ID}`)
    
    this.setState({users:res.data.items, loading:false})
  }
  render(){
   
    return (
      <div className="App">
        <Navbar  />
        <div className="container">
          <Search searchUsers={this.searchUsers}/>
          <Users users={this.state.users} loading = {this.state.loading}/>
        </div>
        
      </div>
    );
  }
  }
 

export default App;
