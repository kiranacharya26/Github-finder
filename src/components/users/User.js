import React, { Fragment, useEffect } from 'react'
import Spinner from '../layouts/spinner'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Repos from '../Repos/Repos'

const User = ({user, loading,getUser,getUserRepos,repos,match}) =>  {
    useEffect(() =>{
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, [])
 
        const {name, avatar_url,bio,location,login,html_url,followers, following,public_repos,public_gists,hireable,company} = user

        if(loading) return <Spinner/>
        return <Fragment>
            <Link to = '/' className='btn btn-light'>Back to search</Link>
            Hireable:{''}
            {hireable ? (<i className = "fas fa-check text-success" />): 
            (<i className = "fas fa-times-circle text-danger" />)}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="roung-img" alt="" style={{width:"150px"}}/>
                    <h1>{name}</h1>
                    <p>{location}</p>
                    <div>
                        {bio && <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>}
                        <a href={html_url} className= "brn btn-dark my-1">Visit my github</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                        <strong>Username: </strong>{login}
                                    </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                        <strong>Company: </strong>{company}
                                    </Fragment>}
                            </li>
                        </ul>    
                    </div>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary"> Followers: {followers}</div>
                <div className="badge badge-success"> following: {following}</div>
                <div className="badge badge-danger"> Public repos: {public_repos}</div>
                <div className="badge badge-dark"> Puiblic gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
        </Fragment>  
}
User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
}
export default User
