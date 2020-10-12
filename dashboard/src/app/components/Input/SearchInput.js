/*BASIC MODULES*/
    import React from 'react'


function SearchInput( { table, value, placeholder, onChange, onClick } ) { return ( 

    <section className='SearchInput'>

        <input onChange = { onChange } value = { value } placeholder = { placeholder }/>

        <button>
            <i onClick = { onClick } className='fas fa-search'/>
        </button>

    </section>

)}


export default SearchInput