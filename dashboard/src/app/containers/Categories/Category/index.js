//BASIC MODULES
    import React, { useEffect } from 'react'

//STATE MODULES
    import categoriesMapDispatchToProps from '../../../actions/categories.js'
    import { connect } from 'react-redux'

//COMPONENTS MODULES        
    import CategoryDetails from './CategoryDetails.js'
    import ProductListsOfCategories from './ProductLists.js' 


function Category( props ){ 
    

/*Hooks*/
    useEffect( () => { props.getCategory( props.match.params._id ) }, [] )
 



/*Returnr*/
return !props.Categories  ?  
( 
    <></> 
)  
: 
(

    <section className='Category'>
        <article onClick = { props.history.goBack }>
            <div>
                VOLTAR
            </div>
        </article>

        <article>
            <div>
                <CategoryDetails/>
            </div>
            <div>
                <ProductListsOfCategories/>
            </div>
        </article>
    </section>

)}


const mapStateToProps = state => { return { ...state.categories } } 
export default connect( mapStateToProps, categoriesMapDispatchToProps )( Category )