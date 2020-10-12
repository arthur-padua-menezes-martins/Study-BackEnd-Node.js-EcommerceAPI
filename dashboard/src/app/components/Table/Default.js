/*BASIC MODULES*/
    import React from 'react'
    import { Link } from 'react-router-dom'


function DefaultTable( { header, info } ) { return (

    <section className='DefaultTable-section'>

        <table className='DefaultTable-table'>

            <thead>

                <tr>

                {
                    header  &&  header.map( ( iterator, index ) => ( <th key={index}>{ iterator }</th> ))
                }

                </tr>

            </thead>

            <tbody>

                {
                    info  &&  info.map( ( line, idx ) =>
                    (
                        <tr key={idx}>
                        {
                            header.map( ( item, index ) => ( <td key={index}>{ line[item]  ||  '' }</td> ))
                        }
                        {
                            line['detalhes']  && ( <td> <Link to = { line['detalhes'] }><button>DETALHES</button></Link> </td> )
                        }
                        </tr>
                    ))
                }

            </tbody>

        </table>

    </section>

)}


export default DefaultTable