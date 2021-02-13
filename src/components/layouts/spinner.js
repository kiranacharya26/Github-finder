import React, {Fragment} from 'react'
import spinner from './Spinner-1s-200px.gif'

const Spinner = () => (
        <Fragment>
            <img src={spinner} alt="Loading ..." style = {{width : '200px', display : 'block', margin : 'auto'}}/>
        </Fragment>
    
)

export default Spinner
