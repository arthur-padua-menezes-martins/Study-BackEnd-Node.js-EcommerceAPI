/*BASIC MODULES*/
    import React from 'react'


function DefaultPagination ( { offset, limit, total, onClick } ) { 
    
    let 
        numberOfPages = Math.ceil( total / limit ),
        currentPage = Math.ceil( offset * 20 / limit )

return (

    <section className='Pagination flex horizontal'>
    {
        
        [ ...Array( numberOfPages ).keys() ].map( ( number, index ) => 
        {
            
            return ( <div onClick = { () => { onClick( number ) } } className = {`pagination-item ${ number === currentPage  ?  'pagination-item-active'  :  '' }`}>{ number + 1 }</div> )
        })

    }
    </section>

)}


export default DefaultPagination