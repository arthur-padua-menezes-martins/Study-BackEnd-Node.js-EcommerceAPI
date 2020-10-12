/*BASIC MODULES*/
    import React, { useState, useEffect } from 'react'

/*STATE MODULES*/
    import usersMapDispatchToProps from '../../../actions/users.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import DefaultTable from '../../../components/Table/Default.js'
    import DefaultPagination from '../../../components/Pagination/Default.js'


function RequestsDetails( props )
{ 

/*Var's*/
    var 

    /*DefaultTable*/
    DefaultTableHeader = [ 'ID', 'SITUAÇÃO DO PAGAMENTO', 'TOTAL', 'CANCELAMENTO', 'DATA DA REALIZAÇÃO DO PEDIDO' ],
    DefaultTableHeaderInfo, VirtualDefaultTableInfo = {},

    /*MainTitle*/
    MainTitleType = 'h2', MainTitleTitle = 'Pedidos Realizados',




/*State*/

    /*DefaultPagination*/
    [ DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage ] = useState(0),
    [ DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages ] = useState(0),
    [ DefaultPaginationLimit, refreshDefaultPaginationLimit ] = useState(30),

    /*DefaultTable*/
    [ DefaultTableInfo, setDefaultTableInfo ] = useState([])




/*Hooks*/

    /*API*/
    useEffect( async () => 
    {
        await props.getUserRequests( props.User._id, DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
    }, [] )

    /*DefaultTable*/
    useEffect( () => { if( props.UserRequests )
    {

        if( DefaultPaginationTotalPages === 0 ) refreshDefaultPaginationTotalPages( props.UserRequests.total )

        setDefaultTableInfo ( [ ...props.UserRequests.docs.map( iterator => 
        {
            DefaultTableHeaderInfo = [ iterator._id, iterator.payments.status, iterator.payments.value, String( iterator.canceled ), iterator.createdAt ]

            for( let i = 0; i < DefaultTableHeaderInfo.length; i++ )
            {
                VirtualDefaultTableInfo[ DefaultTableHeader[i] ] = DefaultTableHeaderInfo[i]
            }

            return { ...VirtualDefaultTableInfo }
        })])

    }}, [ props.UserRequests ] )




/*Return*/
return (

<header className='Requests'>
    <section>

        <MainTitle type = {MainTitleType} title = {MainTitleTitle}/>


        <DefaultTable 
        info = { DefaultTableInfo } 
        header = { DefaultTableHeader }/>


        <DefaultPagination 
        offset = { DefaultPaginationCurrentPage } 
        limit = { DefaultPaginationLimit } 
        total = { DefaultPaginationTotalPages } 
        onClick = { DefaultPaginationCurrentPage => 
        { 
            refreshDefaultPaginationCurrentPage( DefaultPaginationCurrentPage )
            props.getUserRequests( props.User._id, DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
        }}/> 


    </section>
</header>

)}


const mapStateToProps = state => { return { ...state.users, ...state.UserRequests } } 
export default connect( mapStateToProps, usersMapDispatchToProps )( RequestsDetails )