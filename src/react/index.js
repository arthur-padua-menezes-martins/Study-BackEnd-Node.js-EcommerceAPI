

/*IMPORT MODULES*/
/**********************************************************************************************************************************/
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'




/*IMPORT VIEWS*/
/**********************************************************************************************************************************/
import Navbar from './Navbar'
import App from './App'




/*USE VIEWS*/
/**********************************************************************************************************************************/
ReactDOM.render(
  <React.StrictMode> 
    
    <Navbar /> 
    
  </React.StrictMode>, document.getElementById('navbar')
)  

ReactDOM.render(
  <React.StrictMode> 
    
    <App /> 
    
  </React.StrictMode>, document.getElementById('root')
)  




serviceWorker.unregister()
