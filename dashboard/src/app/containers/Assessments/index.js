/*BASIC MODULES*/
    import React, { useState } from 'react'
    import moment from 'moment'

/*COMPONENTS MODULES*/
    import MainTitle from '../../components/Text/MainTitle.js'
    import DefaultTable from '../../components/Table/Default.js'



function Assessments()
{ 

/*STATE*/
    let 
        [ search, onSearch ] = useState( '' ),
        [ currentPage, refreshCurrentPage ] = useState( 0 )

/*DEFAULT TABLE*/
    const DefaultTableInfo = 
    [
        {
            'cliente': 'Arthur',
            'data': moment().format('DD/MM/YYYY'),
            'detalhes' : '../../adm/assessment/4ds156as4d8sa6d'
        },
        {
            'cliente': 'Maria',
            'data': moment().format('DD/MM/YYYY'),
            'detalhes' : '../../adm/assessment/adas4684as5'
        },
        {
            'cliente': 'Sarah',
            'data': moment().format('DD/MM/YYYY'),
            'detalhes' : '../../adm/assessment/ad354s5a4d5as'
        },
    ]

return (

<header className='Assessments'>
    <section>

        <MainTitle type='h2' title='Avaliações'/>

        <DefaultTable info = { DefaultTableInfo } header = { [ 'cliente', 'data' ] }/>

    </section>
</header>

)}


export default Assessments