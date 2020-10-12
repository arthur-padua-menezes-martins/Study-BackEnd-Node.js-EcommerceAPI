/*Basic Modules************************************************************************************************/
    import React, { useState, useEffect } from 'react'

/*State Modules************************************************************************************************/
    import productsMapDispatchToProps from '../../../actions/products.js'
    import { connect } from 'react-redux'

/*Components Modules************************************************************************************************/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import SimpleButton from '../../../components/Button/SimpleButton.js'
    import InformationText from '../../../components/Text/InformationText.js'
    import StateInput from '../../../components/Input/StateInput.js'

/*Helpers Modules************************************************************************************************/

    /*Object*/
    import HelpersSetName from '../../../helpers/Object/setName.js'
    import newProductInformationsKeys from '../../../helpers/Object/newProductInformationsKeys.js'
    /*Function*/
    import HelpersFunctionSetName from '../../../helpers/Function/setName.js'


function NewProduct( props ) { 


/*Var's************************************************************************************************/
    var 

    /*Payload*/

    
    /*New Product Informations Container*/


    /*MainTitle*/
    MainTitleType = [ 'h2' ], MainTitleTitle = [ 'Novo Produto' ],




/*State************************************************************************************************/
    
    [ newProduct, setNewProduct ] = useState({
        'reference' : '1',
        'type' : '',
        'title' : '',
        'description' : '',
        'availability' : '',
        'categories' : '',
        'variations' : '',
        'assessments' : ''
    })


    /*NewProduct Information*/

    
    /*Initial NewProduct Information*/




/*Render************************************************************************************************/

    /*Header*/
    function RenderHeader() { return (

        <section>
            <div>
                <MainTitle 
                type = { MainTitleType[0] } 
                title = { MainTitleTitle[0] } />
            </div>
        </section>

    )}

    
    /*Body*/
    function RenderBody(){ return (

        <section>

            <article>

                

            </article>

        </section>

    )}


    /*Save NewProduct*/
    function RenderSaveChanges() { return (

        <article>

            <button onClick = { () => props.createProduct() }>
                SALVAR ALTERAÇÕES
            </button>

        </article>
        
    )}




/*Auto Invoked Function***********************************************************************************************






/*Return************************************************************************************************/
return (

    <section className='NewProductDetails'>

        { RenderHeader() }

        { RenderBody() }

        { RenderSaveChanges() }

    </section>

)}


const mapStateToProps = state => { return { ...state.categories } } 
export default connect( mapStateToProps, productsMapDispatchToProps )( NewProduct )