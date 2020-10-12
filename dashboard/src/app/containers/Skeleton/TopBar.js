/*BASIC MODULES*/
    import React from 'react'
    import { Link } from 'react-router-dom'


function TopBar () 
{ return (

    <header>
        <article>

            <div>
                <a href='/'>Ver Loja</a>
            </div>

            <div>
                <Link to = { '/' }>
                    <strong>Logout</strong>
                </Link>
            </div>

        </article>
    </header>

)}


export default TopBar