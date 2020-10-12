/*Basic Modules**********************************************************************************************************/
    import React, { useState } from 'react'

/*State Modules**********************************************************************************************************/
    import usersMapDispatchToProps from '../../../actions/users.js'
    import { connect } from 'react-redux'

/*Components Modules**********************************************************************************************************/
    import MainTitle from '../../../components/Text/MainTitle.js'
    import SimpleButton from '../../../components/Button/SimpleButton.js'
    import InformationText from '../../../components/Text/InformationText.js'
    import StateInput from '../../../components/Input/StateInput.js'

/*Helpers Modules**********************************************************************************************************/
    
    /*Object*/
    import HelpersSetName from '../../../helpers/Object/setName.js'
    /*Function*/
    import HelpersFunctionInequalityCheck from '../../../helpers/Function/InequalityCheck.js'
    import HelpersFunctionSetName from '../../../helpers/Function/setName.js'


function UserDetails( props) { 
    

/*Var's**********************************************************************************************************/
    var 

    /*User Information Container*/
    informations = [], initialInformations = [], 
    
    /*User Delivery Information Container*/
    addressInformations = [], initialAddressInformations = [], 
    
    /*Others*/
    label = String(), payload = Object(),
    
    /*Helpers Inequality Check*/
    InequalityCheckCheckers = [ 'address', 'phone', 'password', 'salt', 'payload', '__v' ],




/*State**********************************************************************************************************/

    [ userInformation, setUserInformation ] = useState
    (
        Object.keys( props.User ).map( key =>
        {
            
            //Set User Informations
            if( HelpersFunctionInequalityCheck( key, InequalityCheckCheckers ) )
            { 
                informations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = 
                    { 
                        <StateInput oldValue = { props.User[key] }
                        onSave = { newValue => { props.User[key] = newValue; setUserInformation( props.User[key] = newValue ) } } />
                    }/>
                )
            } 
            
            //Set User Phone Informations
            if( key=='phone' )
            {
                informations.push
                (
                    <InformationText keys={ HelpersFunctionSetName( HelpersSetName, key ) } value = { 
                        <StateInput oldValue = { props.User[key] }
                        onSave = { newValue => { props.User[key] = newValue; setUserInformation( props.User[key] = newValue ) } } /> 
                    }/>
                )
            }
            
            //Set User Delivery Informations
            if( key=='address' )  
            {

                Object.keys( props.User[key] ).map( addressKeys =>
                {
                    addressInformations.push
                    (
                        <InformationText keys={ HelpersFunctionSetName( HelpersSetName, addressKeys ) } value = 
                        { 
                            <StateInput oldValue = { props.User[key][addressKeys]  }
                            onSave = { newValue => { props.User[key][addressKeys] = newValue; setUserInformation( props.User[key][addressKeys] = newValue ) } } />
                        }/> 
                    )
                })
            }

        })
    ),

    /*Initial User Information*/
    [ initialInformations, setInitialInformations ] = useState( informations ),

    /*Initial User Delivery Information*/
    [ initialAddressInformations, setInitialAddressInformations ] = useState( addressInformations )
    

    
    
/*Render**********************************************************************************************************/

    /*Header*/
    function RenderHeader() { return (

        <section>
          
            <div>
                <MainTitle type='h1' title = { "userInformation[5]['name']" }/>
            </div>
        
            <div>
                <SimpleButton onClick = { () => alert('salvo') } type='success' placeholder='salvar'/>
            </div>

            <div>
                <SimpleButton onClick = { () => alert('removido')} type='warning' placeholder='remover'/>
            </div>

        </section>

    )}

    
    /*User Details*/
    function RenderUserDetails() 
    { 
        return informations.map( informations => ( informations ) )
    }


    /*User Delivery Details*/
    function RenderDeliveriesDetails()
    {
        return addressInformations.map( addressInformations => ( addressInformations ) )
    }


    /*Save User Details*/
    function RenderSaveChanges() { return (

        <article>

            <button onClick = { () => props.updateUser( props.User._id, payload ) }>SALVAR ALTERAÇÕES</button>

        </article>
        
    )}


     
/*Auto Invoked Function**********************************************************************************************************/
( () => {


    initialInformations.map( ( initialInformations, index ) =>
    {
        if(  initialInformations.props.value.props.oldValue != informations[index].props.value.props.oldValue )
        {  
            payload[ HelpersFunctionSetName( HelpersSetName, informations[index].props.keys, false ) ] 
            = informations[index].props.value.props.oldValue
        }
    })

    initialAddressInformations.map( ( initialAddressInformations, index ) =>
    {
        if(  initialAddressInformations.props.value.props.oldValue != addressInformations[index].props.value.props.oldValue )
        {  
            payload[ HelpersFunctionSetName( HelpersSetName, addressInformations[index].props.keys, false ) ] 
            = addressInformations[index].props.value.props.oldValue
        }
    })
    

})()




/*Return**********************************************************************************************************/
return (

    <section>

        { RenderHeader() }

        { RenderUserDetails() }

        { RenderDeliveriesDetails() }
    
        { RenderSaveChanges() }

    </section>
    
)}


const mapStateToProps = state => { return { ...state.users } } 
export default connect( mapStateToProps, usersMapDispatchToProps )( UserDetails )