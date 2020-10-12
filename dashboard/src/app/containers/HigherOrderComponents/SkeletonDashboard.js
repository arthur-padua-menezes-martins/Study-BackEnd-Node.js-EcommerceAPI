/*BASIC MODULES*/
    import React from 'react'
    import Dashboard from '../Skeleton/Dashboard'


const base = Component => { return ( props ) => { return (

    <Dashboard history = { props.history } >
        <Component { ...props } ></Component>
    </Dashboard>

)}}


export default base