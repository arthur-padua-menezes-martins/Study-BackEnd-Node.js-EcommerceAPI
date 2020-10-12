import React from 'react'
import { Link } from 'react-router-dom'
import MainTitle from '../../../components/Text/MainTitle.js'
import SimpleButton from '../../../components/Button/SimpleButton.js'


function Assessment() { 
    
    function RenderHeader() { return (

        <section>

            <article>

                <MainTitle  type='h2' title='Avaliação'/>
                <MainTitle  type='h4' title='Cliente 1'/>

            </article>


            <article>
                <SimpleButton onClick = { () => alert('DELETADO') } placeholder='REMOVER'/>
            </article>

        </section>

    )}


    function RenderAssessment() { return (

        <section>
            <article>
                
                <div>
                    MESSAGE    
                </div>

                <span>
                    STARS
                </span>

            </article>
        </section>
        
    )}
    
    
return (

    <section className='Assessment'>

        <article>
            { RenderHeader() }
        </article>

        <article>
            { RenderAssessment() }
        </article>

    </section>

)}


export default Assessment