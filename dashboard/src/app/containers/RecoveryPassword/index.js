/*BASIC MODULES*/
    import React, { useState } from 'react'

/*COMPONENTS MODULES*/
    import MainTitle from '../../components/Text/MainTitle.js'
    import AuthenticationInput from '../../components/Input/AuthenticationInput.js'
    import AuthenticationButton from '../../components/Button/AuthenticationButton.js'


function RecoveryPassword() { 
    
    let [ email, setEmail ] = useState('')
    

    function onChangeInput( event )
    {
        setEmail( event.target.value )
    }


return(
    
    <section className='RecoveryPassword'>

        <article className=''>

            <MainTitle type='h2' title='recuperar senha'/>

            <span>iforme seu e-mail de recuperção de senha.</span>
            <AuthenticationInput onChange = { event => onChangeInput( event ) } value = { email } type='text' reference='email'/>

            <AuthenticationButton onClick = { () => alert('AuthenticationButton') } route = {'/recovery-password'} type='button' placeholder='ENVIAR'/>

        </article>

    </section>

)}


export default RecoveryPassword