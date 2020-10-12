/*Basic Modules**********************************************************************************************************/
    import React, { useEffect } from 'react'

/*State Modules**********************************************************************************************************/
    import productsMapDispatchToProps from '../../../actions/products.js'
    import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
    import ProductDetails from './ProductDetails'
    import VariationsDetails from './VariationsDetails/index.js'




function Product( props ) { 
    
   
/*Hooks**********************************************************************************************************/
    useEffect( () => { props.getProduct( props.match.params._id ) }, [] )
    
    


/*Return**********************************************************************************************************/
return !props.Product  ?  ( <></> )  :  (

    <main>
        <section>
            <ProductDetails/>
        </section>

        <section>
            <VariationsDetails/>
        </section>
    </main>

)}


const mapStateToProps = state => { return {  ...state.products } } 
export default connect( mapStateToProps, productsMapDispatchToProps )(Product)