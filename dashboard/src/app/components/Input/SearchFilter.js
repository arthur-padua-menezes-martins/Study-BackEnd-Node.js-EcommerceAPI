import React from 'react'


function SearchFilter( { order, label, } ) { return (

    <div>
        <label>

            <select> 

                { label }

                <option>padrão</option>

                <option value = { 'a-z' }>Alfabética crescente</option>

                <option value = { 'z-a' }>Alfabética decrescente</option>

                <option value = { 'maior valor' }>Preço crescente</option>

                <option value = { 'menor valor' }>Preço decrescente</option>

            </select>

        </label>
    </div>

)}


export default SearchFilter