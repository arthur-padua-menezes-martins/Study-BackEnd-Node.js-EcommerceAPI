/*BASIC MODULES*/
    import React from 'react'


function AuthenticationInput( { value, type, placeholder, onChange } ) { return (

    <div className='AuthenticationInput'>

        <input onChange = { onChange } type = { type } value = { value } placeholder = { placeholder  ?  placeholder  :  '' }/>

    </div>

)}


export default AuthenticationInput