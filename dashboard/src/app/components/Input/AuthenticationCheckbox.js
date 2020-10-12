/*BASIC MODULES*/
    import React from 'react'


function AuthenticationCheckbox( { checked, label, onChange } ) { return (
    
    <div className='AuthenticationCheckbox'>

        <label>
            <input onChange = { onChange } checked = { checked } type='checkbox'/>
            {label}
        </label>

    </div>

)}


export default AuthenticationCheckbox