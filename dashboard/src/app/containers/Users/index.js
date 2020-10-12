//BASIC MODULES
    import React, { useState, useEffect } from 'react'

//STATE MODULES
    import usersMapDispatchToProps from '../../actions/users.js'
    import { connect } from 'react-redux'

//COMPONENTS MODULES
    import MainTitle from '../../components/Text/MainTitle.js'
    import AdvancedSearchInput from '../../components/Input/AdvancedSearchInput.js'
    import DefaultTable from '../../components/Table/Default.js'
    import DefaultPagination from '../../components/Pagination/Default.js'


function Users( props )
{ 

//Var`s
    var

    //MainTitle
    MainTitleType = [ 'h2' ],
    MainTitleTitle = [ 'Usuários' ],

    //SearchInput
    AdvancedSearchInputTable = [ 'users' ],
    AdvancedSearchInputPlaceholder = [ 'pesquise por usuários' ],

    //DefaultTable
    DefaultTableHeader = [ 'ID', 'CLIENTE', 'E-MAIL', 'TELEFONE', 'DATA DO CADASTRO' ],




//State
 
    //AdvancedSearchInput
    [ simpleSearch, onSimpleSearch ] = useState(),
    [ searchBody, setSearchBody ] = useState(),

    //DefaultPagination
    [ DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage ] = useState(0),
    [ DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages ] = useState(0),
    [ DefaultPaginationLimit, refreshDefaultPaginationLimit ] = useState(30),

    //DefaultTable
    [ DefaultTableInfo, setDefaultTableInfo ] = useState([])




//Hooks

    //API
    useEffect( async () => { await props.getUsers( DefaultPaginationCurrentPage, DefaultPaginationLimit ) }, [] )

    //DefaultTable
    useEffect( () => { if( props.Users )
    {
            
        DefaultPaginationTotalPages === 0  && refreshDefaultPaginationTotalPages( props.Users.total )

        setDefaultTableInfo ( [ ...props.Users.docs.map( iterator => (
        { 
            'ID' : iterator._Id,
            'CLIENTE' : iterator.name,
            'E-MAIL' : iterator.email,
            'TELEFONE' : iterator.phone,
            'DATA DO CADASTRO' : iterator.createdAt,
            'detalhes' : `/adm/user/${iterator._id}`
        }))])

    }}, [ props.Users ] )




//Return
return !props.Users  ?  
(
<header></header>
)  
:
(

<header className='Users'>
    <section>


        <MainTitle 
        type = { MainTitleType[0] }
        title = { MainTitleTitle[0] } />


        <AdvancedSearchInput 
        table = { AdvancedSearchInputTable[0] } 
        placeholder = { AdvancedSearchInputPlaceholder[0] }
        simpleSearch = { simpleSearch } 
        Body = { Body => setSearchBody(Body) }
        onClick = { () => {} } 
        onChange = { event => onSimpleSearch( event.target.value ) }/>


        <DefaultTable 
        info = { DefaultTableInfo }
        header = { DefaultTableHeader }/>


        <DefaultPagination 
        offset = { DefaultPaginationCurrentPage } 
        limit = { DefaultPaginationLimit } 
        total = { DefaultPaginationTotalPages } 
        onClick = { DefaultPaginationCurrentPage => { 
            refreshDefaultPaginationCurrentPage( DefaultPaginationCurrentPage )
            props.getUsers( DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
        }}/>


    </section>
</header>

)}


const mapStateToProps = state => { return {  ...state.users } } 
export default connect( mapStateToProps, usersMapDispatchToProps )(Users)