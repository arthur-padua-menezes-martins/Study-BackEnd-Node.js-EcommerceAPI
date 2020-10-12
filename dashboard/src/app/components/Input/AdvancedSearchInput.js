/*BASIC MODULES*/
import React from 'react'


function SearchInput( { Body, table, simpleSearch, placeholder, onChange, onClick } ) { 
    
    function advancedSearchBody(){ return(
        <div>

            <div>

                <textarea rows='10' cols='40'></textarea>

            </div>
            
            <div onClick = { () => Body() } >

                <i class="fas fa-times"></i>

            </div>
            
        </div>
    ) }
    
    
return ( 

    <section className='SearchInput'>


        <input value = { simpleSearch } placeholder = { placeholder }
        onChange = { onChange } />


        <button>

            <i className='fas fa-search'
            onClick = { () => {} } />

        </button>


        <button>

            <i className="fab fa-js"
            onClick = { () => Body( advancedSearchBody ) }/>

        </button>


    </section>

)}


export default SearchInput