import React from 'react'


function ImageDisplay( { images, onSave, onRemove } ) { return (


    <section>

        <article className='ImageDisplayInput'>

            <input 
            onChange = { ( event ) => onSave(event) } 
            type='file' 
            name='file'
            multiple
            />

        </article>

        <article className='ImagesDisplayContainer'>

        {
            images.map( ( src, index ) =>
            (
                <section className='ImageDisplayContainer' style = { { backgroundImage : `url("${ src }")` } } key={index}>
                    
                    <div onClick = { () => onRemove(index) } className='ImageDisplayRemove'>
                        <span>{'-'}</span>
                    </div>

                </section>
            ))
        }

        </article>

    </section>


)}


export default ImageDisplay