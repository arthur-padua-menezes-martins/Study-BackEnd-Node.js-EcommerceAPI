/*BASIC MODULES*/
    import React, { useState } from 'react'

/*COMPONENTS MODULES*/
    import ListOfMenuItems from './ListOfMenuItems'

    
function Menu ( { history } ) { 
    
    let [ open, toggleOpen ] = useState( true ) 

return (

    <main className={`Menu ${ open  &&  'Menu-open' }`}>

        <div onClick = { () => toggleOpen( !open ) } className={`item-top flex ${ open  ?  'flex-end'  :  'flex-center' }`} >
            <i className={`fas fa-arrow-${ open  ?  'left'  :  'right' }`}/>
        </div>

        <hr/>

        <ListOfMenuItems open = { open } history = { history }/>

    </main>

)}

export default Menu