/*BASIC MODULES*/
    import React, { useState, useEffect } from 'react'

/*STATE MODULES*/
    import requestsMapDispatchToProps from '../../../actions/requests.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import DynamicList from '../../../components/List/DynamicList.js'


function PaymentsDetails( props ) { 
    
    /*Var´s*/
    var paymentStatusInfo = []


    /*State*/
    var 
    [ info, setInfo ] = useState([]),
    [ status, setStatus ] = useState(),
    [ statusMessage, setStatusMessage ] = useState( { 1 : 'pagamento não confirmado', 2 : 'pagamento confirmado' } )


    /*Hooks*/
    useEffect( () =>
    {
        props.RecordsRequest.reduce( ( acumulator, iterator, index ) => 
        { 
            if( iterator.type=='payment' )
            {
                setInfo ( info = [ ...info, statusMessage[ iterator.situation ] ] ) 
                if( props.RecordsRequest.length - 1 == index ) { setStatus( iterator.situation ) }
            }
        }, [] ) 
    }, [] )


    /*DynamicList*/
    Object.keys( statusMessage ).map( key =>
    {
        paymentStatusInfo.push( <p>{`${key} : ${statusMessage[key]}`}</p> )
    })


    /*Render*/
    function whenAddingDynamicList( newInfo )
    {
        setInfo( [ ...info, statusMessage[newInfo] ] ) 

        setStatus( newInfo )
    }
    

    function whenRemovingDynamicList( statusForRemoval )
    {
        setInfo( info.filter( ( iterator, index ) => index !== statusForRemoval ) )

        props.postPaymentsStatus( props.Request._id, statusForRemoval, 'remove' )
    }
    

return (

    <section>
        

        <article className='PaymentsDetails'>

            <MainTitle type='h2' title='Pagamento'/>

        </article>


        <article>

            <DynamicList info = { info }
            onAdd = { whenAddingDynamicList } 
            onRemove = { whenRemovingDynamicList } />

        </article>


        <article>

            { paymentStatusInfo}

        </article>


        <article>

            <button onClick = { () => { props.postPaymentsStatus( props.Request.payments._id, status, 'update' ) } } >
                SALVAR ALTERAÇÕES
            </button>

        </article>
        

    </section>

)}


const mapStateToProps = state => { return { ...state.requests } } 
export default connect( mapStateToProps, requestsMapDispatchToProps )(PaymentsDetails)