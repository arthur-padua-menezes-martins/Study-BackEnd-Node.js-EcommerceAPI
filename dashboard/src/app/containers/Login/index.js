/*BASIC MODULES*/
    import React, { useState } from 'react'
    import { Link } from 'react-router-dom'

/*API MODULES*/
    import { connect } from 'react-redux'
    import backend from '../../actions/login.js'

/*COMPONENTS MODULES*/
    import MainTitle from '../../components/Text/MainTitle.js'
    import AuthenticationInput from '../../components/Input/AuthenticationInput.js'
    import AuthenticationCheckbox from '../../components/Input/AuthenticationCheckbox.js'
    import AuthenticationButton from '../../components/Button/AuthenticationButton.js'



function Login() { 
    
    let 
        [ email, setEmail ] = useState(''),
        [ password, setPassword ] = useState(''),
        [ checkbox, setCheckbox ] = useState(false),
        selectField = { email : setEmail, password : setPassword }


    function onChangeInput( event, field )
    {
        selectField[field]( event.target.value )
    }
    

    function handleLogin( info )
    {
        backend.handleLogin( info, () => alert('i') )
    }


return(
    
    <section className='Login'>
        
        <article className=''>

            <MainTitle type='h2' title='logar-se'/>

            <AuthenticationInput onChange = { event => onChangeInput( event, 'email' ) } value = { email } type='text' reference='email' placeholder='e-mail'/>
            <AuthenticationInput onChange = { event => onChangeInput( event, 'password' ) } value = { password } type='password' reference='password' placeholder='senha'/>

            <article className=''>

                <div>
                    <AuthenticationCheckbox onChange = { () => setCheckbox( !checkbox ) } checked = { checkbox } reference='checkbox' label='LEMBRAR LOGIN'/>
                </div>

                <div>
                    <Link to = {'/recovery-password'}>esqueci minha senha</Link>
                </div>


            </article>

            <AuthenticationButton onClick = { () => handleLogin( { email, password } ) } type='button' placeholder='LOGAR-SE'/>

        </article>

    </section>

)}


export default connect( null, backend )( Login )