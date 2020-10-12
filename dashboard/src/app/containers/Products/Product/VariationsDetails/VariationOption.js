/*Basic Modules**********************************************************************************************************/
    import React, { useState, useEffect } from 'react'

/*State Modules**********************************************************************************************************/
    import productsMapDispatchToProps from '../../../../actions/products.js'
    import { connect } from 'react-redux'
import axios from 'axios'
/*Components Modules**********************************************************************************************************/
    import MainTitle from '../../../../components/Text/MainTitle.js'
    import SimpleButton from '../../../../components/Button/SimpleButton.js'
    import InformationText from '../../../../components/Text/InformationText.js'
    import StateInput from '../../../../components/Input/StateInput.js'
    import StateSelect from '../../../../components/Select/StateSelect.js'
    import ImageDisplay from '../../../../components/Images/ImageDisplay.js'

/*Helpers Modules**********************************************************************************************************/
        
    /*Object*/
    import HelpersSetName from '../../../../helpers/Object/setName.js'
    /*Function*/
    import HelpersFunctionInequalityCheck from '../../../../helpers/Function/InequalityCheck.js'
    import HelpersFunctionSetName from '../../../../helpers/Function/setName.js'


function Variations( props )
{

/*Var's**********************************************************************************************************/
    
    var
    /*Payload*/
    payload = {},
    
    /*Files*/
    imageFiles,

    /*Product Information Container*/
    variationsInformations = [],
    variationsSelectInformations = [],
    VariationsOptions = [],

    /*MainTitle*/
    MainTitleType = [ 'h2' ], MainTitleTitle = [ `Variações de ${props.Product.title}` ]

    /*Set Product Information Container Lenght*/
    for( let i = 0; i < props.Product.variations.length; i++ ) 
    { 
        variationsInformations[i] = []
        variationsSelectInformations[i] = []
    }




/*State**********************************************************************************************************/
    
    /*Select Variation to Display*/ 
    var 
    [ variationToDisplay, setVariationToDisplay ] = useState (),

     /*Files*/
     [ uploadedFiles, setUploadedFiles ] = useState({}),

    /*Variations Information*/
    [ productInformation, setProductInformation ] = useState (
        props.Product.variations.map( ( Variation, index ) => Object.keys( Variation ).map( key =>
        {

            if( HelpersFunctionInequalityCheck( key ) && key!=='deliveries' && key!=='availability' )
            {
                variationsInformations[index].push(
                    <InformationText key = { Math.random() } keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    { 
                        <StateInput 
                        oldValue = { props.Product.variations[index][key] }
                        onSave = { newValue => 
                        { 
                            props.Product.variations[index][key] = newValue
                            setProductInformation( props.Product.variations[index][key] = newValue ) 
                        }}/>
                    }/>
                )
            }

            if(key==='availability')
            {
                variationsSelectInformations[index].push(
                    <InformationText key = { Math.random() } keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    {
                        <StateSelect
                        selectedValue = { String ( props.Product.variations[index][key] ) } 
                        options = { [ { value : 'true', label : 'DISPONÍVEL' }, { value : 'false', label : 'INDISPONÍVEL' } ] } 
                        onSave = { newSelectedValue => 
                        {
                            props.Product.variations[index][key] = newSelectedValue
                        }}/>
                    }/>
                )
            }

            if(key==='images')
            {
                variationsInformations[index].push(
                    <ImageDisplay 
                        images = { props.Product.variations[index][key] }
                        onSave = { event => handleUploadImage(event, index) }
                        onRemove = { indexForRemoval => removeImageByIndex(props.Product.variations[index]._id, indexForRemoval) }/>
                )
            }
                
        }))
    )
    



/*Auto Invoked Functions**********************************************************************************************************/
/*Functions**********************************************************************************************************/
    
    /*Remove Picture of Details Of a Product Variation*/
    function removeImageByIndex(_id, indexForRemoval)
    {
        props.removeImages(_id, indexForRemoval)
        props.getProduct(props.Product._id)
    }

    function handleUploadImage(event, index)
    {
        setUploadedFiles( { index : event.target.files } )

        imageFiles = new FormData()
        imageFiles.set('file', event.target.files[0])

        props.updateImages(props.Product.variations[index]._id, event.target.files)
    }




/*Render**********************************************************************************************************/
    
    /*Header*/
    function RenderHeader(){ return (

        <section>
            <article className='RenderHeader'>
                <MainTitle 
                type = { MainTitleType[0] }
                title = { MainTitleTitle[0] } 
                />
            </article>

        </section>

    )}


    /*All Product Variations*/
    function RenderVariationOptions() { 

        for( let i = 0; i < props.Product.variations.length; i++ ) 
        { 
            VariationsOptions.push(
                <div onClick = { () => setVariationToDisplay(i) }>
                {
                    props.Product.variations[i].title
                }
                </div>
            )
        }

        return ( 
            <>
            {
                VariationsOptions.map(VariationsOptions=>VariationsOptions)
            }
            </>
    )}


    /*Details Of a Product Variation*/
    function RenderVariationDetails( index ) { 
 
        for( let i = 0; i < variationsInformations.length; i++ )
        {
            variationsInformations[i].push( 
                variationsSelectInformations[i][0] 
            )

            variationsInformations[i].push(
                <button onClick = { () => props.updateProduct(
                    props.Product.variations[i]._id, 
                    props.Product.variations[i], true 
                )} >ENVIAR</button>             
            )
        }
        
        return (
            <>
            {
                variationsInformations[index]
            }
            </>
    )}




/*Return**********************************************************************************************************/
return (

    <section className='Variation'>

            <section>
                
                <article>
                    { RenderHeader() }
                </article>

            </section>


            <section>
                
                <article>
                    { RenderVariationOptions() }
                </article>
        

                <article>
                    { variationToDisplay!==undefined ? RenderVariationDetails(variationToDisplay) : '' }
                </article>

            </section>

<button onClick = { () => console.log(props) }>props</button>
<button onClick = { () => console.log(props.Product.variations) }>props.Product.variations</button>
<button onClick = { () => console.log(uploadedFiles) }>uploadedFiles</button>


        </section>
 
)}


const mapStateToProps = state => { return {  ...state.products } } 
export default connect( mapStateToProps, productsMapDispatchToProps )(Variations)