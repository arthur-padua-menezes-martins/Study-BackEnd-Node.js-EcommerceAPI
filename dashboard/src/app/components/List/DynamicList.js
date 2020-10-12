/*BASIC MODULES*/
    import React, { useState } from 'react'

/*COMPONENTS MODULES*/
    import SimpleButton from '../../components/Button/SimpleButton.js'
    import SimpleInput from '../../components/Input/SimpleInput.js'

    
function DynamicList( { info, onAdd, onRemove } ) { 
    
    let [ inputContent, changeInputContent ] = useState('')
    
return (

    <section className='flex vertical'>

        { info.map( ( iterator, indexForRemoval ) => (
                        
        <div className='flex horizontal' key={indexForRemoval}>

            <div className='flex flex-3 flex-start'>

                <span>{iterator}</span>

            </div>

            { onRemove  &&  (

            <div className='flex flex-1 flex-center'>

                <SimpleButton type='danger' placeholder='-'
                onClick = { () => onRemove( indexForRemoval ) } />
                            
            </div>

            )}

        </div>
        
        ))}

        <div>

            <div className='flex flex-3 flex-start'>

                <SimpleInput type='text' value = { inputContent }
                onChange = { ( targetValue ) => { changeInputContent( targetValue ) } } />

            </div>

            { onAdd  &&  (

            <div className='flex flex-1 flex-center'>

                <SimpleButton type='success' placeholder='+'
                onClick = { () => onAdd( inputContent ) } />

            </div>

            )}

        </div>
        
    </section>

)}


export default DynamicList