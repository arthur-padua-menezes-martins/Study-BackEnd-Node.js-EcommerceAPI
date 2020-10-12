/*BASIC MODULES*/
    import React from 'react'


function MainTitle( { type, title } ) 
{
    const MainTitleTag =
    {
        h1 : <h1 className='MainTitle'>{ title }</h1>,
        h2 : <h2 className='MainTitle'>{ title }</h2>,
        h3 : <h3 className='SubTitle'>{ title }</h3>,
        h4 : <h4 className='SubTitle'>{ title }</h4>,
        h5 : <h5 className='SubTitle'>{ title }</h5>,
        h6 : <h6 className='SubTitle'>{ title }</h6>
    }

    return MainTitleTag[type] 
}


export default MainTitle