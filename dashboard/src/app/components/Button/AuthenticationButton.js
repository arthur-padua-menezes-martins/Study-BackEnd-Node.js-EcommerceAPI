/*BASIC MODULES*/
    import React from 'react'
    import { Link } from 'react-router-dom'


const Button = ( { type, placeholder, onClick } ) =>
(

    <section className=''>
        
        <button onClick = { onClick } className='AuthenticationButton'>{ placeholder }</button>
        
    </section>

)


function AuthenticationButton( { route, type, placeholder, onClick } ) { 

    if( route ) return (

    <Link to = { route }>
        <Button onClick = { onClick } type = { type } placeholder = { placeholder }/>
    </Link>

    )
    else return (
        <Button onClick = { onClick } type = { type } placeholder = { placeholder }/>
    )
}


export default AuthenticationButton