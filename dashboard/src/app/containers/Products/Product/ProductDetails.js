/*Basic Modules**********************************************************************************************************/
    import React, { useState } from 'react'
    import { Link } from 'react-router-dom'

/*State Modules**********************************************************************************************************/
    import productsMapDispatchToProps from '../../../actions/products.js'
    import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import InformationText from '../../../components/Text/InformationText.js'
    import StateInput from '../../../components/Input/StateInput.js'
    import StateTextarea from '../../../components/Textarea/StateTextarea.js'
    import StateSelect from '../../../components/Select/StateSelect.js'
    import ImageDisplay from '../../../components/Images/ImageDisplay.js'

/*Helpers Modules**********************************************************************************************************/
        
    /*Object*/
    import HelpersSetName from '../../../helpers/Object/setName.js'
    /*Function*/
    import HelpersFunctionInequalityCheck from '../../../helpers/Function/InequalityCheck.js'
    import HelpersFunctionSetName from '../../../helpers/Function/setName.js'
    

function ProductDetails( props ) { 
     

/*Var's**********************************************************************************************************/
    
    var
    /*Payload*/
    payload = {},
        
    /*Product Information Container*/
    productInformations = [], productSelectInformations = [],

    /*MainTitle*/
    MainTitleType = [ 'h2' ], MainTitleTitle = [ `${props.Product.title}` ],

    /*StateSelect*/
    [ StateSelectSelectedValue, setStateSelectSelectedValue ] = useState( props.Product.availability ),




/*State**********************************************************************************************************/
    
    /*Product Information*/
    [ productInformation, setProductInformation ] = useState(
        Object.keys( props.Product ).map( key =>
        {
            if( HelpersFunctionInequalityCheck( key ) && key!=='availability' )
            {
                productInformations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    { 
                        <StateInput oldValue = { props.Product[key] }
                        onSave = { newValue => 
                        { 
                            props.Product[key] = newValue
                            setProductInformation( props.Product[key] = newValue ) 
                        }}/>
                    }/>
                )
            }
            if(key==='description')
            {
                productInformations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    { 
                        <StateTextarea oldValue = { props.Product[key] } rows='10'
                        onSave = { newValue => 
                        { 
                            props.Product[key] = newValue
                            setProductInformation( props.Product[key] = newValue ) 
                        }}/>
                    }/>
                ) 
            }
            if(key==='availability')
            {
                productSelectInformations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    {
                       <StateSelect 
                       selectedValue = { StateSelectSelectedValue } 
                       options = { [ { value : 'true', label : 'DISPONÍVEL' }, { value : 'false', label : 'INDISPONÍVEL' } ] } 
                       onSave = { newSelectedValue => setStateSelectSelectedValue( newSelectedValue ) }
                       />
                    }/>
                )
            }
                
        })
    ),
    
    /*Initial Product Information*/
    [ initialProductInformations, setInitialProductInformations ] = useState( productInformations ),
    [ InitialProductAvailabilityInformation, setInitialProductAvailabilityInformation] = useState( productSelectInformations[0].props.value.props.selectedValue ),
    _



/*Auto Invoked Function**********************************************************************************************************/
( () => {


    initialProductInformations.map( ( initialProductInformations, index ) =>
    {
        if(  initialProductInformations.props.value.props.oldValue !== productInformations[index].props.value.props.oldValue )
        {  
            payload[ HelpersFunctionSetName( HelpersSetName, productInformations[index].props.keys, false ) ] 
            = productInformations[index].props.value.props.oldValue
        }
        else
        {
            payload[ HelpersFunctionSetName( HelpersSetName, productInformations[index].props.keys, false ) ] 
            = initialProductInformations.props.value.props.oldValue
        }
    })

    payload['availability'] = InitialProductAvailabilityInformation === productSelectInformations[0].props.value.props.selectedValue  ?
    InitialProductAvailabilityInformation  :  productSelectInformations[0].props.value.props.selectedValue
  

})()




/*Render**********************************************************************************************************/

    /*Header*/
    function RenderHeader() { return (

        <section>
            
            <div>
                <MainTitle 
                type = { MainTitleType[0] } 
                title = { MainTitleTitle[0] }/>
                <Link to = { `/adm/assessments/${props.Product._id}` }>Avaliações do Produto</Link>
            </div>

        </section>

    )}




/*Return**********************************************************************************************************/
    return (

        <section>

            { RenderHeader() }

            { productInformations.map(productInformations => productInformations) }

            { productSelectInformations.map( productSelectInformations => productSelectInformations ) }

            <button onClick = {()=>console.log(props)}>props</button>
            
            <button onClick = {()=>console.log(payload)}>payload</button>

        </section>
        
    )
}


const mapStateToProps = state => { return {  ...state.products } } 
export default connect( mapStateToProps, productsMapDispatchToProps )(ProductDetails)