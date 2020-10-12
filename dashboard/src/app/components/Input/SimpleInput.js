import React from 'react'


function SimpleInput( { label, type, value, onChange } ) { return (

    <div className='SimpleInput'>

        { label  ?  <label>{ label }</label>  :  null }

        <input  onChange = { event => onChange( event.target.value ) } type = { type } value = { value }/>        

    </div>

)}


export default SimpleInput