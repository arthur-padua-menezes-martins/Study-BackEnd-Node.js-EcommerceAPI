/*Basic Modules**********************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/*State Modules**********************************************************************************************************/
import productsMapDispatchToProps from '../../actions/products.js'
import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
import MainTitle from '../../components/Text/MainTitle.js'
import AdvancedSearchInput from '../../components/Input/AdvancedSearchInput.js'
import DefaultTable from '../../components/Table/Default.js'
import DefaultPagination from '../../components/Pagination/Default.js'


function Products(props) {


    /*Var's**********************************************************************************************************/
    var

        /*MainTitle*/
        MainTitleType = ['h2'],
        MainTitleTitle = ['Produtos'],

        /*SearchInput*/
        AdvancedSearchInputTable = ['products'],
        AdvancedSearchInputPlaceholder = ['pesquise por produtos'],

        /*DefaultTable*/
        DefaultTableHeader = ['ID', 'REFERÊNCIA', 'TÍTULO', 'CATEGORIA', 'DISPONIBILIDADE', 'DATA DO CADASTRO'],
        DefaultTableHeaderInfo, VirtualDefaultTableInfo = [],




        /*State**********************************************************************************************************/

        /*AdvancedSearchInput*/
        [simpleSearch, onSimpleSearch] = useState(),
        [searchBody, setSearchBody] = useState(),

        /*DefaultPagination*/
        [DefaultPaginationCurrentPage, refreshDefaultPaginationCurrentPage] = useState(0),
        [DefaultPaginationTotalPages, refreshDefaultPaginationTotalPages] = useState(0),
        [DefaultPaginationLimit, refreshDefaultPaginationLimit] = useState(30),

        /*DefaultTable*/
        [DefaultTableInfo, setDefaultTableInfo] = useState([])




    /*Hooks**********************************************************************************************************/

    /*API*/
    useEffect(async () => { await props.getProducts(DefaultPaginationCurrentPage, DefaultPaginationLimit) }, [])

    /*DefaultTable*/
    useEffect(() => {
        if (props.Products) {

            DefaultPaginationTotalPages === 0 && refreshDefaultPaginationTotalPages(props.Products.total)

            setDefaultTableInfo([...props.Products.docs.map(iterator => {
                DefaultTableHeaderInfo = [iterator._id, iterator.reference, iterator.title, iterator.categories.name, String(iterator.availability), iterator.createdAt]

                for (let i = 0; i < DefaultTableHeaderInfo.length; i++) {
                    VirtualDefaultTableInfo[DefaultTableHeader[i]] = DefaultTableHeaderInfo[i]
                    VirtualDefaultTableInfo['detalhes'] = `/adm/product/${iterator._id}`
                }

                return { ...VirtualDefaultTableInfo }
            })])

        }
    }, [props.Products])




    /*Return**********************************************************************************************************/
    return !props.Products ? (<></>) : (

        <header className='Products'>
            <section>


                <Link to={'/adm/new-product'}>REGISTRAR NOVO PRODUTO</Link>

                <MainTitle
                    type={MainTitleType[0]}
                    title={MainTitleTitle[0]} />


                <AdvancedSearchInput
                    table={AdvancedSearchInputTable[0]}
                    placeholder={AdvancedSearchInputPlaceholder[0]}
                    simpleSearch={simpleSearch}
                    Body={Body => setSearchBody(Body)}
                    onClick={() => { }}
                    onChange={event => onSimpleSearch(event.target.value)} />


                <DefaultTable
                    info={DefaultTableInfo}
                    header={DefaultTableHeader} />


                <DefaultPagination
                    offset={DefaultPaginationCurrentPage}
                    limit={DefaultPaginationLimit}
                    total={DefaultPaginationTotalPages}
                    onClick={DefaultPaginationCurrentPage => {
                        refreshDefaultPaginationCurrentPage(DefaultPaginationCurrentPage)
                        props.getProducts(DefaultPaginationCurrentPage, DefaultPaginationLimit)
                    }} />

                <button onClick={() => console.log(props)}>props</button>
            </section>
        </header>

    )
}


const mapStateToProps = state => { return { ...state.products } }
export default connect(mapStateToProps, productsMapDispatchToProps)(Products)












































/*BASIC MODULES
import React, { useState } from 'react'
import moment from 'moment'


import MainTitle from '../../components/Text/MainTitle.js'
import SearchInput from '../../components/Input/SearchInput.js'
import SearchFilter from '../../components/Input/SearchFilter.js'
import DefaultTable from '../../components/Table/Default.js'
import DefaultPagination from '../../components/Pagination/Default.js'


function Products()
{


    let
        [ search, onSearch ] = useState( '' ),
        [ currentPage, refreshCurrentPage ] = useState( 0 )

    const DefaultTableInfo =
    [
        {
            'código': 'act_0001',
            'título': 'exlusivo pokemon raro',
            'disbonibilidade': 'true',
            'categoria': 'actionfigures',
            'detalhes' : '/adm/product/act_0001'

        },
        {
            'código': 'act_0002',
            'título': 'exlusivo pokemon ultra raro',
            'disbonibilidade': 'true',
            'categoria': 'actionfigures',
            'detalhes' : '/adm/product/act_0002'
        },
    ]


return (

    <header className='Products'>
        <section>

            <MainTitle type='h2' title='Produtos'/>

            <section>

                <div>
                    <SearchInput onClick = { () => {} } onChange = { ( event ) => onSearch( event.target.value ) } table = { 'users' } value = { search } placeholder = { 'pesquise por nome, descrição ou categoria' }/>
                </div>

                <div>
                    <SearchFilter label='ordenar por'/>
                </div>

            </section>

            <DefaultTable info = { DefaultTableInfo } header = { [ 'título', 'categoria', 'disbonibilidade' ] }/>

            <DefaultPagination offset = { currentPage } limit = { 20 } total = { 120 } onClick = { ( currentPage ) => { refreshCurrentPage( currentPage ) } }/>

        </section>
    </header>

)}


export default Products*/