/*BASIC MODULES*/
    import React, { useEffect } from 'react'
/*STATE MODULES*/
    import requestsMapDispatchToProps from '../../../actions/requests.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/    
    import RequestsDetails from './RequestsDetails.js'
    import DeliveriesDetails from './DeliveriesDetails.js'
    import PaymentsDetails from './PaymentsDetails.js'


function Request( props ) { 
    
    /*Hooks*/
    useEffect( () => { props.getRequest( props.match.params._id ) }, [] )

    
return !props.Request  ?  
( 
    <main></main> 
)  
:  
(

    <main className='Request flex vertical'>

        <article onClick = { props.history.goBack }>
            VOLTAR
        </article>

        <article>
            <RequestsDetails/>
        </article>

        <article className='flex horizontal'>

            <section className='flex flex-1 vertical'>
                <DeliveriesDetails/>
            </section>

            <section className='flex flex-1 vertical'>
                <PaymentsDetails/>
            </section>
            
        </article>
        <button onClick = { () => { console.log( props ) } } >CONSOLE.LOG( PROPS )</button>

    </main>

)}


const mapStateToProps = state => { return { ...state.requests } } 
export default connect( mapStateToProps, requestsMapDispatchToProps )(Request)
