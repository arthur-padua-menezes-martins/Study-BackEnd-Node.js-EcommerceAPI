//BASIC MODULES
    import React, { useState, useEffect } from 'react'

//STATE MODULES
    import categoriesMapDispatchToProps from '../../../actions/categories.js'
    import { connect } from 'react-redux'

//COMPONENTS MODULES
    import MainTitle from '../../../components/Text/MainTitle.js'
    import SearchInput from '../../../components/Input/SearchInput.js'
    import DefaultTable from '../../../components/Table/Default.js'
    import DefaultPagination from '../../../components/Pagination/Default.js'


function ProductListsOfCategories( props ) { 
    

/*Var's*/
    var 
        
    /*DefaultTable*/
    DefaultTableHeader = [ 'ID', 'CÓDIGO DE REFERÊNCIA', 'TÍTULO', 'DISPONIBILIDADE', 'DATA DO CADASTRO' ],
    DefaultTableHeaderInfo, VirtualDefaultTableInfo = {},

    /*MainTitle*/
    MainTitleType = [ 'h3' ], MainTitleTitle = [ 'Produtos da Categoria' ],

    /*SearchInput*/
    SearchInputTable = 'categories',
    SearchInputPlaceholder = 'pesquise por produtos da categoria',




/*State*/
     
    /*SearchInputSearchInput*/
    [ SearchInputSearch, onSearchInputSearch ] = useState(''),
    [ DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage ] = useState(0),
    [ DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages ] = useState(0),
    [ DefaultPaginationLimit, refreshDefaultPaginationLimit ] = useState(30),

    /*DefaultTable*/
    [ DefaultTableTableInfo, setDefaultTableTableInfo ] = useState([])




//Hooks

    //API
    useEffect( async () => { await props.getCategory(  DefaultPaginationCurrentPage, DefaultPaginationLimit ) }, [] )

    /*DefaultTable*/
    useEffect( () => { if( Boolean( props.Categories ) )
    {
            DefaultPaginationTotalPages === 0  &&  refreshDefaultPaginationTotalPages( Math.max( Object.keys( props.Categories.products ) ) ) 

            setDefaultTableTableInfo( [ ...props.Categories.products.map( iterator => {
             
                DefaultTableHeaderInfo = [ iterator._id, iterator.reference, iterator.title, String( iterator.availability ), iterator.createdAt ]

                for( let i = 0; i < DefaultTableHeaderInfo.length; i++ )
                {
                    VirtualDefaultTableInfo[ DefaultTableHeader[i] ] = DefaultTableHeaderInfo[i]
                }
        
                return { ...VirtualDefaultTableInfo, 'detalhes' : `/adm/request/${iterator._id}` }

            })])            
    }}, [ props.Categories ] )


    

/*Return*/
return (

    <header className='ProductLists ProductListsOfCategories'>
        <section>


            <MainTitle 
            type = { MainTitleType[0] } 
            title = { MainTitleTitle[0] } />


            <SearchInput 
            table = { SearchInputTable } 
            placeholder = { SearchInputPlaceholder }
            value = { SearchInputSearch } 
            onClick = { () => {} } 
            onChange = { event => onSearchInputSearch( event.target.value ) } />


            <DefaultTable 
            info = { DefaultTableTableInfo } 
            header = { DefaultTableHeader }/>


            <DefaultPagination 
            offset = { DefaultPaginationCurrentPage } 
            limit = { DefaultPaginationLimit } 
            total = { DefaultPaginationTotalPages } 
            onClick = { DefaultPaginationCurrentPage => { 
                refreshDefaultPaginationCurrentPage( DefaultPaginationCurrentPage )
                props.getProductsCategories( props.Categories._id, DefaultPaginationCurrentPage, DefaultPaginationLimit ) 
            }}/> 


        </section>
    </header>

)}


const mapStateToProps = state => { return { ...state.categories } } 
export default connect( mapStateToProps, categoriesMapDispatchToProps )( ProductListsOfCategories )