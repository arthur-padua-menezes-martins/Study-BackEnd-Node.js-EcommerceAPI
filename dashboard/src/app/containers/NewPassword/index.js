/*BASIC MODULES*/
    import React, { useState } from 'react'

/*COMPONENTS MODULES*/
    import MainTitle from '../../components/Text/MainTitle.js'
    import AuthenticationInput from '../../components/Input/AuthenticationInput.js'
    import AuthenticationButton from '../../components/Button/AuthenticationButton.js'


function NewPassword() { 
    
    let 
        [ password, setPassword ] = useState(''),
        [ resetCode, setResetCode ] = useState('')
    

    function onChangeInput( event )
    {
        setPassword( event.target.value )
    }


return(
    
    <section className='NewPassword'>

        <article className=''>

            <MainTitle type='h2' title='recuperar senha'/>

            <span>iforme seu e-mail de recuperção de senha.</span>
            
            <AuthenticationInput onChange = { event => onChangeInput( event ) } value = { password } type='text' reference='password' placeholder='nova senha'/>
            
            <AuthenticationInput onChange = { event => onChangeInput( event ) } value = { resetCode } type='text' reference='resetCode' placeholder='código   redefinição'/>

            <AuthenticationButton onClick = { () => alert('senha redefinida com Sucesso') } route = {'/login'} type='button' placeholder='ENVIAR'/>

        </article>

    </section>

)}


export default NewPassword