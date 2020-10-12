/*BASIC MODULES*/
    import React from 'react'

/*COMPONENTS MODULES*/
    import TopBar from './TopBar.js'
    import Menu from './Menu.js'


function Dashboard ( props ) { return (

    <main className='flex horizontal full-height'>

        <article className='flex vertical'>
            <Menu history = { props.history }/>
        </article>

        <div className='flex vertical full-height'>

            <header className='flex horizontal'>
                <TopBar/>
            </header>

            <article className='flex full-height'>
                { props.children }
            </article>

        </div>

    </main>

)}


export default Dashboard