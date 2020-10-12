/*Basic Modules**********************************************************************************************************/
    import React, { useState } from 'react'

/*State Modules**********************************************************************************************************/
    import productsMapDispatchToProps from '../../../../actions/products.js'
    import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
    import VariationOption from './VariationOption.js'


function VariationsDetails( props ) { return (

    <section className='VariationsDetails'>
        <article>
            <VariationOption />
        </article>
    </section>

)}


const mapStateToProps = state => { return {  ...state.products } } 
export default connect( mapStateToProps, productsMapDispatchToProps )(VariationsDetails)