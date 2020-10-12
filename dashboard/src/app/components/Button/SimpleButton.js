import React from 'react'


function SimpleButton( { type, placeholder, onClick } ){ return (

    <>
        <button onClick = { onClick }>{ placeholder }</button>
    </>

)}


export default SimpleButton