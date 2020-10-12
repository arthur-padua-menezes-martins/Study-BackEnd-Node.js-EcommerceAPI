/*BASIC MODULES*/
    import React, { useState, useEffect } from 'react'

/*STATE MODULES*/
    import requestsMapDispatchToProps from '../../actions/requests.js'
    import { connect } from 'react-redux'

/*COMPONENTS MODULES*/
    import MainTitle from '../../components/Text/MainTitle.js'
    import SearchInput from '../../components/Input/SearchInput.js'
    import DefaultTable from '../../components/Table/Default.js'
    import DefaultPagination from '../../components/Pagination/Default.js'


function Requests( props )
{ 


/*Var's*/
    var

    /*MainTitle*/
    MainTitleType = [ 'h2' ],
    MainTitleTitle = [ 'Pedidos' ],

    /*SearchInput*/
    SearchInputTable = [ 'requests' ],
    SearchInputPlaceholder = [ 'pesquise por pedidos' ],

    /*DefaultTable*/
    DefaultTableHeader = [ 'CLIENTE', 'FORMA DE PAGAMENTO', 'TOTAL', 'DATA DO CADASTRO' ],




/*State*/
     
    /*SearchInputSearchInput*/
    [ SearchInputSearch, onSearchInputSearch ] = useState(''),
    //DefaultPagination
    [ DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage ] = useState(0),
    [ DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages ] = useState(0),
    [ DefaultPaginationLimit, refreshDefaultPaginationLimit ] = useState(30),

    /*DefaultTable*/
    [ DefaultTableTableInfo, setDefaultTableTableInfo ] = useState([])
    


/*Hooks*/

    /*API*/
    useEffect( async () => { await props.getRequests( DefaultPaginationCurrentPage, DefaultPaginationLimit ) }, [] )
    console.log(props)
    /*DefaultTable*/
    useEffect( () =>
    {
        if( Boolean( props.Requests ) )
        {
            DefaultPaginationTotalPages === 0  &&  refreshDefaultPaginationTotalPages( props.Requests.total )
            setDefaultTableTableInfo( [ ...props.Requests.docs.map( iterator => (
            { 
                'CLIENTE' : iterator.users.name,
                'FORMA DE PAGAMENTO' : iterator.payments.paymentMethod,
                'TOTAL' : iterator.payments.value,
                'DATA DO CADASTRO' : iterator.createdAt,
                'detalhes' : `/adm/request/${iterator._id}`
            }))])
        }
    }, [ props.Requests ] )




return !props.Requests  ?  
(
    <header></header>
)  
:  
(
    
    <header className='Requests'>
        <section>


            <MainTitle 
            type = { MainTitleType[0] }
            title = { MainTitleTitle[0] } />


            <SearchInput 
            table = { SearchInputTable[0] } 
            placeholder = { SearchInputPlaceholder[0] }
            value = { SearchInputSearch }
            onClick = { () => {} } 
            onChange = { ( event ) => onSearchInputSearch( event.target.value ) } />
            

            <DefaultTable 
            info = { DefaultTableTableInfo } 
            header = { DefaultTableHeader }/>


            <DefaultPagination 
            offset = { DefaultPaginationCurrentPage } 
            limit = { DefaultPaginationLimit } 
            total = { DefaultPaginationTotalPages }
            onClick = { DefaultPaginationCurrentPage => { 
                refreshDefaultPaginationCurrentPage( DefaultPaginationCurrentPage )
                props.getRequests( DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
            }}/>


            <button onClick = { () => { console.log( props ) } } >CONSOLE.LOG( PROPS )</button>

        </section>
    </header>

)

}


const mapStateToProps = state => { return { ...state.requests } } 
export default connect( mapStateToProps, requestsMapDispatchToProps )( Requests )