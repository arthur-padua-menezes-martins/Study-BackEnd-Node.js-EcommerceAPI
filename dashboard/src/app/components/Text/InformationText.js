import React from 'react'


function InformationText( { keys, value } )
{ return(

    <section className='InformationText'>  

        <strong>{ keys }&nbsp;:&nbsp;</strong>    
        <span>{ value }</span>

    </section>

)}


export default InformationText