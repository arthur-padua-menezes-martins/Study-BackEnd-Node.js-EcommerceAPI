/*BASIC MODULES*/
    import React, { useState, useEffect } from 'react'

/*STATE MODULES*/
    import requestsMapDispatchToProps from '../../../actions/requests.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import SimpleButton from '../../../components/Button/SimpleButton.js'
    import InformationText from '../../../components/Text/InformationText.js'
    import StateInput from '../../../components/Input/StateInput.js'
    import DefaultTable from '../../../components/Table/Default.js'

/*HELPERS MODULES*/

    /*Object*/
    import HelpersSetName from '../../../helpers/Object/setName.js'
    /*Function*/
    import HelpersFunctionInequalityCheck from '../../../helpers/Function/InequalityCheck.js'
    import HelpersFunctionSetName from '../../../helpers/Function/setName.js'


function RequestDetails( props ) {

/*Var's*/
    var
    
    /*User Information Container*/
    userInformations = [],

    /*Address Information Container*/
    addressInformations = [],

    /*Delivery Information Container*/
    deliveryInformations = [],

    /*Payment Information Container*/
    paymentInformations = [],
    paymentAddressInformations = [],

    /*DefaultTable*/
    DefaultTableHeader = [ 'ID', 'Produto', 'Total', 'Total em Produtos', 'Preço por Unidade', 'Quantidade' ],

    /*DefaultTable*/
    MainTitleType = [ 'h2', 'h3' ],
    MainTitleTitle = [ 'Informações do Usuário', 'Informações do Produto', 'Informações da Entrega', 'Informações do Pagamento', 'PEDIDO CANCELADO' ],

    userInformativeTexts = [], 
    addressInformativeTexts = [], 
    paymentInformativeTexts = [], 
    tableInformativeTexts = [[]] ,
    virtualTable = [], 
    
    /*Helpers Inequality Check*/
    InequalityCheckCheckers = [ 'address', 'card', 'phone', 'password', 'salt', 'payload', '__v' ],




/*State*/
    
    /*DefaultTable*/
    [ DefaultTableInfo, setDefaultTableInfo ] = useState([])

        
    

/*Hooks*/

    /*DefaultTable*/
    useEffect( () => { if( props.Request )
    {

        setDefaultTableInfo ( props.Request.cart.map( iterator => 
        {

            return {
                'ID' : iterator['variations']['_id'],
                'Produto' : iterator['variations']['title'],
                'Total' : props.Request.payments.value,
                'Total em Produtos' : iterator['unitaryValue'] * iterator['quantity'],
                'Preço por Unidade' : iterator['unitaryValue'],
                'Quantidade' : iterator['quantity']
            }

        }))

    }}, [] )




/*Auto Invoked Function*/

    Object.keys( props.Request.users ).map( key =>
    {
        //Set User Informations
        if( HelpersFunctionInequalityCheck( key, InequalityCheckCheckers ) )
        { 
            userInformations.push
            (
                <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = { props.Request.users[key] }/>
            )
        } 
        //Set User Phone Informations
        if( key=='phone' )
        {
            userInformations.push
            (
                <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = { props.Request.users[key] }/>
            )
        }
    })
    

    Object.keys( props.Request.deliveries ).map( key =>
    {

        //Set User Delivery Informations
        if( HelpersFunctionInequalityCheck( key, InequalityCheckCheckers ) )
        { 
            addressInformations.push
            (
                <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = { props.Request.deliveries[key] }/>
            )
        }

        //Set User Delivery Address Informations
        if( key=='address' )  
        {
            Object.keys( props.Request.deliveries[key] ).map( addressKeys =>
            {
                addressInformations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, addressKeys ) } value = { props.Request.deliveries[key][addressKeys] }/>
                )
            })
        }

    })


    Object.keys( props.Request.payments ).map( paymentKey =>
    {
        //Set User Payment Delivery Informations
        if( HelpersFunctionInequalityCheck( paymentKey, InequalityCheckCheckers ) && paymentKey!=='card' )
        {
            paymentInformations.push
            (
                <InformationText keys={ HelpersFunctionSetName( HelpersSetName, paymentKey ) } 
                value = { props.Request.payments[paymentKey] }/>
            )
        }
    })

    Object.keys( props.Request.payments.address ).map( paymentAddressKeys =>
    {
        //Set User Payment Delivery Informations
        paymentAddressInformations.push
        (
            <InformationText keys={ HelpersFunctionSetName( HelpersSetName, paymentAddressKeys ) } 
            value = { props.Request.payments.address[paymentAddressKeys] }/>
        )
    })


    Object.keys( props.Request.cart ).map( ( index ) =>
    {
        Object.keys(props.Request.cart[index]).map( key =>
        {
            virtualTable.push( { total : props.Request.cart[index]['unitaryValue'] * props.Request.cart[index]['quantity'] } )

            key=='variations' &&
            virtualTable.push( { produto : props.Request.cart[index]['variations']['title'] } )

            key=='unitaryValue' &&
            virtualTable.push( { unidade : props.Request.cart[index]['unitaryValue'] } )

            key=='quantity' &&
            virtualTable.push( { quantidade : props.Request.cart[index]['quantity'] } )

            if( props.Request.deliveries && key=='unitaryValue' ) 
            { 
                paymentInformativeTexts.push 
                ( 
                    <InformationText keys={'taxa de entrega'} 
                    value = { Number( props.Request.deliveries['value'] - Number( tableInformativeTexts[index]['total'] ) ) }/> 
                )
            } 

            tableInformativeTexts[index] = Object.assign( {} , ...virtualTable )
        })
    })




/*Render*/

    /*Header*/
    function RenderTextHeader() { return (

        <section>


            <article>

                { 
                    props.Request.canceled && 
                    ( 
                        <MainTitle 
                        type = { MainTitleType[0] }
                        title = { MainTitleTitle[4] }/> 
                    )
                }

                <MainTitle 
                type = { MainTitleType[0] }
                title = { `${props.Request.users.name} | ${props.Request.createdAt}` }/>
                
            </article>


            <article>

                <SimpleButton type='danger' placeholder='CANCELAR PEDIDO'
                onClick = { () => props.removeRequest( props.Request._id ) } />

            </article>


        </section>

    )}
    

    /*User Information*/
    function RenderUserInformation() { return (

        <section>

            <hr/>

            <MainTitle 
            type = { MainTitleType[1] }
            title = { MainTitleTitle[0] }/>

            { userInformations.map( userInformations => ( userInformations ) ) }

        </section>

    )}


    /*Cart Information*/
    function RenderCartInformation() { return ( 

        <section> 

            <hr/>

            <MainTitle 
            type = { MainTitleType[1] } 
            title = { MainTitleTitle[1] } />

            <DefaultTable 
            header = { DefaultTableHeader } 
            info = { DefaultTableInfo }/> 

        </section> 

    )} 


    /*Deliveries Information*/
    function RenderDeliveriesInformation() { return (

        <section>

            <hr/>

            <MainTitle 
            type = { MainTitleType[1] } 
            title = { MainTitleTitle[2] } />

            { addressInformations.map( addressInformations => ( addressInformations ) ) }
            
        </section>

    )}
    

    /*Payments Information*/
    function RenderPaymentsInformation() { return (

        <section>

            <MainTitle 
            type = { MainTitleType[1] }
            title = { MainTitleTitle[3] } />

            { paymentInformations.map( paymentInformations => ( paymentInformations ) ) }
            { paymentAddressInformations.map( paymentAddressInformations => ( paymentAddressInformations ) ) }

        </section>

    )}
      



/*Return*/
return (

    <section>
        <article className='RequestDetails'>

            { RenderTextHeader() }          
            
            { RenderUserInformation() }  

            { RenderCartInformation() }

            { RenderDeliveriesInformation() }  
            
            { RenderPaymentsInformation() }  

        </article>
    </section>

)}


const mapStateToProps = state => { return { ...state.requests } } 
export default connect( mapStateToProps, requestsMapDispatchToProps )(RequestDetails)