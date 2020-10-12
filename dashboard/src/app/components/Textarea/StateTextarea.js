/*BASIC MODULES*/
import React, { useState} from 'react'


function StateTextarea( { oldValue, rows, label, onSave } ) { 
    
    let 
        [ newValue, setNewValue ] = useState( oldValue ),
        [ form, handdleFrom ] = useState( false )


    function renderForm() { return (

        <section className='flex vertical StateTextarea StateTextarea-open'>

            <div className='flex'>
                <textarea onChange = { ( event ) => { console.log('aaaaaa');setNewValue( event.target.value ) } } value = { newValue } for = { label } rows = { rows } />
            </div>

            <section className='flex horizontal flex-1'>

                <div onClick = { () => { onSave( newValue ); handdleFrom( !form ) } }>
                    <i className='fas fa-check'/>
                </div>

                <div onClick = { () => { setNewValue( oldValue ); handdleFrom( !form ) } }>
                    <i className='fas fa-times'/>
                </div>

            </section>

        </section>
    
    )}


    function renderView() { return (

        <section className='StateTextarea'>

            <span>
                { label  ?  <label id={label}>{ label }</label>  :  '' }
            </span>

            <div onClick = { () => { handdleFrom( !form ) } }>
                <i className='fas fa-edit'/> 
                { oldValue }
            </div>

        </section>
    
    )}


return( form  ?  renderForm()  :  renderView() )}


export default StateTextarea