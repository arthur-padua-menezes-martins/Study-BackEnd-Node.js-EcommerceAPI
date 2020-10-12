/*BASIC MODULES*/
    import React, { useState, useEffect } from 'react'

/*STATE MODULES*/
    import requestsMapDispatchToProps from '../../../actions/requests.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import DynamicList from '../../../components/List/DynamicList.js'
    import StateInput from '../../../components/Input/StateInput.js'


function DeliveriesDetails( props ) { 

    /*var´s*/
    var deliveryStatusInfo = []


    /*State*/
    var
    [ info, setInfo ] = useState([]),
    [ TrackingCode, setTrackingCode ] = useState( props.Request.deliveries.trackingCode || '' ),
    [ status, setStatus ] = useState(),
    [ statusMessage, setStatusMessage ] = useState( { 0 : `atualização no código de rastramento`, 1 : 'entrega a caminho', 2 : 'entrega realizada' } )


    /*Hooks*/
    useEffect( () =>
    {
        props.RecordsRequest.reduce( ( acumulator, iterator, index ) => 
        { 
            if( iterator.type=='delivery' )
            {
                setInfo ( info = [ ...info, statusMessage[ iterator.situation ] ] ) 
                if( props.RecordsRequest.length - 1 == index ) { setStatus( iterator.situation ) }
            }
        }, [] ) 
    }, [] )


    /*DynamicList*/
    Object.keys( statusMessage ).map( key =>
    {
        deliveryStatusInfo.push( <p>{`${key} : ${statusMessage[key]}`}</p> )
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
    

    <article className='DeliveriesDetails'>

        <MainTitle type='h2' title='Entrega'/>

    </article>


    <article className='DeliveriesTrackingCode'>

        <StateInput oldValue = { TrackingCode } label='código de rastreamento' 
        onSave = { newValue => 
        { 
            setTrackingCode( newValue ) 
            props.postDeliveriesStatus( props.Request.deliveries._id, newValue, 'trackingCode' )
        }} />

    </article>


    <article>

        <DynamicList info = { info }
        onAdd = { whenAddingDynamicList } 
        onRemove = { whenRemovingDynamicList }/>

    </article>


    <article>

        { deliveryStatusInfo}

    </article>


    <article>

        <button onClick = { () => { props.postDeliveriesStatus( props.Request.deliveries._id, status, 'update' ) } } >
            SALVAR ALTERAÇÕES
        </button>
<button onClick = { () => console.log(props) }> C LOG PROPS </button>
     </article>

    
</section>

)}


const mapStateToProps = state => { return { ...state.requests } } 
export default connect( mapStateToProps, requestsMapDispatchToProps )(DeliveriesDetails)