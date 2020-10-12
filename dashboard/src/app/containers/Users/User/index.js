/*Basic Modules**********************************************************************************************************/
    import React, { useEffect } from 'react'

/*State Modules**********************************************************************************************************/
    import usersMapDispatchToProps from '../../../actions/users.js'
    import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
    import UserDetails from './UserDetails.js'
    import RequestsDetails from './RequestsDetails.js'


function User( props ) {


/*Hooks**********************************************************************************************************/
    useEffect( () => { props.getUser( props.match.params._id ) }, [] )




/*Return**********************************************************************************************************/
return !props.User  ?  ( <></> )  :  (

    <section className='User'>

        <article onClick = { props.history.goBack }>
            VOLTAR
        </article>

        <article className=''>
            <UserDetails/>
        </article>

        <article className=''>
            <RequestsDetails/>
        </article>

    </section>

)}


const mapStateToProps = state => { return { ...state.users } } 
export default connect( mapStateToProps, usersMapDispatchToProps )( User )