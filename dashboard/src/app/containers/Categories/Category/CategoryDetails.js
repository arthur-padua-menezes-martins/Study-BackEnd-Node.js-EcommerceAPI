//BASIC MODULES
import React, { useState, useEffect } from 'react'

//STATE MODULES
    import categoriesMapDispatchToProps from '../../../actions/categories.js'
    import { connect } from 'react-redux'

//COMPONENTS MODULES
    import MainTitle from '../../../components/Text/MainTitle.js'
    import SimpleButton from '../../../components/Button/SimpleButton.js'
    import InformationText from '../../../components/Text/InformationText.js'
    import StateInput from '../../../components/Input/StateInput.js'
    import StateSelect from '../../../components/Select/StateSelect.js'

//HELPERS MODULES

    /*Object*/
    import HelpersSetName from '../../../helpers/Object/setName.js'
    /*Function*/
    import HelpersFunctionSetName from '../../../helpers/Function/setName.js'


function CategoryDetails( props ) { 
    

//Var's
    var 

    /*Payload*/
    payload = {},
    
    /*Category Information Container*/
    informations = [], selectInformations = [],

    /*MainTitle*/
    MainTitleType = [ 'h2' ], MainTitleTitle = [ 'Categoria' ],

    /*StateSelect*/
    [ StateSelectSelectedValue, setStateSelectSelectedValue ] = useState( props.Categories.availability ),



//State

    /*Category Information*/
    [ categoryInformation, setCategoryInformation ] = useState(
        Object.keys( props.Categories ).map( key =>
        {
            if( [ 'code', 'name' ].includes( key ) )
            {
                informations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    { 
                        <StateInput oldValue = { props.Categories[key]  }
                        onSave = { newValue => 
                        { 
                            props.Categories[key] = newValue
                            setCategoryInformation( props.Categories[key] = newValue ) 
                        }}/>
                    }/>
                )
            }
            if( key === 'availability' )
            {
                selectInformations.push
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
    
    /*Initial Category Information*/
    [ initialCategoryInformations, setInitialCategoryInformations ] = useState( informations ),
    [ InitialCategoryAvailabilityInformation, setInitialCategoryAvailabilityInformation ] = useState( selectInformations[0].props.value.props.selectedValue )



  
//Render

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
                { informations.map( informations => ( informations ) ) }
            </article>

            <article>
                { selectInformations.map( selectInformations => ( selectInformations ) ) }
            </article>
        </section>

    )}


    /*Save Category*/
    function RenderSaveChanges() { return (

        <article>
            <button 
            onClick = { () => props.updateCategory( props.Categories._id, payload ) }>SALVAR ALTERAÇÕES</button>
        </article>
        
    )}




//Auto Invoked Function
( () => {


    initialCategoryInformations.map( ( initialCategoryInformations, index ) =>
    {
        if(  initialCategoryInformations.props.value.props.oldValue !== informations[index].props.value.props.oldValue )
        {  
            payload[ HelpersFunctionSetName( HelpersSetName, informations[index].props.keys, false ) ] 
            = informations[index].props.value.props.oldValue
        }
        else
        {
            payload[ HelpersFunctionSetName( HelpersSetName, informations[index].props.keys, false ) ] 
            = initialCategoryInformations.props.value.props.oldValue
        }
    })

    payload['availability'] = InitialCategoryAvailabilityInformation === selectInformations[0].props.value.props.selectedValue  ?
    InitialCategoryAvailabilityInformation  :  selectInformations[0].props.value.props.selectedValue
  

})()




/*Return*/   
return (

    <section className='CategoryDetails'>

        { RenderHeader() }

        { RenderBody() }

        { RenderSaveChanges() }

        <button onClick = { ()  => console.log( props )}>props</button>
        <button onClick = { ()  => console.log( payload )}>payload</button>
    </section>

)}


const mapStateToProps = state => { return { ...state.categories } } 
export default connect( mapStateToProps, categoriesMapDispatchToProps )( CategoryDetails )