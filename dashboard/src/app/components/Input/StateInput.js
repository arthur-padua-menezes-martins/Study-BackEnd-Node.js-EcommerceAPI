/*BASIC MODULES*/
    import React, { useState} from 'react'


function StateInput( { oldValue, label, onSave } ) { 
    
    /*Var`s*/
    var 
    [ newValue, setNewValue ] = useState( oldValue ),
    [ form, handdleFrom ] = useState( false )


     /*Render*/
    function renderForm() { return (

        <section className='flex vertical StateInput StateInput-open'>

            <div className='flex'>

                <input value = { newValue } 
                onChange = { event => setNewValue( event.target.value ) }/>

            </div>

            <section className='flex horizontal flex-1'>

                <div onClick = { () => { onSave( newValue ); handdleFrom( !form ) } }>

                    <i className='fas fa-check'/>

                </div>


                <div onClick = { () => { handdleFrom( !form ); setNewValue( oldValue ) } }>

                    <i className='fas fa-times'/>

                </div>

            </section>

        </section>
    
    )}


    /*Render*/
    function renderView() { return (

        <section className='StateInput'>

            <span>

            { 
                label  ?  <label>{ label }</label>  :  '' 
            }

            </span>

            <div onClick = { () => handdleFrom( !form ) }>

                <i className='fas fa-edit'/> 
                { oldValue }

            </div>

        </section>
    
    )}


return( form  ?  renderForm()  :  renderView() )}


export default StateInput