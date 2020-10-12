/*Basic Modules**********************************************************************************************************/
    import React, { useState } from 'react'


function StateSelect( { selectedValue, options, onSave } ) { 
    

/*Var's**********************************************************************************************************/

    var defaultOptions =
    [
        [ { value : 'true', label : 'DISPONÍVEL' }, { value : 'false', label : 'INDISPONÍVEL' } ]
    ]




/*State**********************************************************************************************************/

    /*Selected Option*/
    var [ newSelectedValue, setNewSelectedValue ] = useState( selectedValue )




/*Auto Invoked Functions**********************************************************************************************************/

    if( selectedValue!==true  &&  options===defaultOptions[0] )
        options = defaultOptions[0].unshift( defaultOptions[0].pop() )




/*Render**********************************************************************************************************/
    return (

        <section className='flex vertical StateSelect'>
            <div className='flex'>

                <select 
                value = { newSelectedValue } 
                onChange = { async event => {
                    setNewSelectedValue( event.target.value ) 
                    onSave( event.target.value )
                }}>

                {
                    options.map( ( iterator, index ) =>
                    {
                        return(
                            <option 
                            key={index} 
                            value = { iterator.value }>
                                { iterator.label }
                            </option>
                        )
                    })
                }

                </select>

            </div>
        </section>
    
)}


export default StateSelect