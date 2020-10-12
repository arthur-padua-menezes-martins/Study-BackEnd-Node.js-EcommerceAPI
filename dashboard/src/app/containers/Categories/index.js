//BASIC MODULES
    import React, { useState, useEffect } from 'react'

//STATE MODULES
    import categoriesMapDispatchToProps from '../../actions/categories.js'
    import { connect } from 'react-redux'

//COMPONENTS MODULES
    import MainTitle from '../../components/Text/MainTitle.js'
    import SearchInput from '../../components/Input/SearchInput.js'
    import DefaultTable from '../../components/Table/Default.js'
    import DefaultPagination from '../../components/Pagination/Default.js'


function Categories( props )
{ 

//Var's
    var 

    //MainTitle
    MainTitleType = [ 'h2' ],
    MainTitleTitle = [ 'Categorias' ],

    //SearchInput
    SearchInputTable = [ 'categories' ],
    SearchInputPlaceholder = [ 'pesquise por categorias' ],

    //DefaultTable
    DefaultTableHeader = [ 'ID', 'CODE', 'CATEGORIA', 'QUANTIDADE DE PRODUTOS CADASTRADOS', 'DISPONIBILIDADE' ],
    DefaultTableHeaderInfo, VirtualDefaultTableInfo = {},



    
//State

    //SearchInput
    [ search, onSearch ] = useState( '' ),

    //DefaultPagination
    [ DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage ] = useState(0),
    [ DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages ] = useState(0),
    [ DefaultPaginationLimit, refreshDefaultPaginationLimit ] = useState(30),

    //DefaultTable
    [ DefaultTableInfo, setDefaultTableInfo ] = useState([])




//Hooks

    //API
    useEffect( async () => { await props.getCategories( DefaultPaginationCurrentPage, DefaultPaginationLimit ) }, [] )

    //DefaultTable
    useEffect( () => { if( props.Categories )
    {
            
        DefaultPaginationTotalPages === 0  && refreshDefaultPaginationTotalPages( props.Categories.total )

        setDefaultTableInfo ( [ ...props.Categories.docs.map( iterator => {
             
            DefaultTableHeaderInfo = [ iterator._id, iterator.code, iterator.products.length, String( iterator.availability ), iterator.createdAt ]

            for( let i = 0; i < DefaultTableHeaderInfo.length; i++ )
            {
                VirtualDefaultTableInfo[ DefaultTableHeader[i] ] = DefaultTableHeaderInfo[i]
            }
    
            return { ...VirtualDefaultTableInfo, 'detalhes' : `/adm/category/${iterator._id}` }

        })])
    }}, [ props.Categories ] )




/*Return*/
return (

<header className='Categories'>
    <section>


        <MainTitle 
        type = { MainTitleType[0] } 
        title = { MainTitleTitle[0] } />


        <SearchInput 
        table = { SearchInputTable[0]} 
        placeholder = { SearchInputPlaceholder[0] }
        value = { search } 
        onClick = { () => {} } 
        onChange = { ( event ) => onSearch( event.target.value ) } />


        <DefaultTable 
        info = { DefaultTableInfo } 
        header = { DefaultTableHeader }/>


        <DefaultPagination 
        offset = { DefaultPaginationCurrentPage } 
        limit = { DefaultPaginationLimit } 
        total = { DefaultPaginationTotalPages } 
        onClick = { DefaultPaginationCurrentPage => { 
            refreshDefaultPaginationCurrentPage( DefaultPaginationCurrentPage )
            props.getCategories( DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
        }}/>


    </section>
</header>

)}


const mapStateToProps = state => { return { ...state.categories } } 
export default connect( mapStateToProps, categoriesMapDispatchToProps )( Categories )