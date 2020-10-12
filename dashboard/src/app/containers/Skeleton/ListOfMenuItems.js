/*BASIC MODULES*/
    import React from 'react'
    import { Link } from 'react-router-dom'


const backBoneListOfMenu =
[
    {
        route: '/adm/',
        title: 'Home',
        icon: ( <i className='fas fa-home'/> )  
    },
    {
        route: '/adm/categories',
        title: 'Categorias',
        icon: ( <i className="fas fa-shopping-cart"></i> )  
    },
    {
        route: '/adm/products',
        title: 'Produtos',
        icon: ( <i className="fas fa-cart-arrow-down"></i> )  
    },
    {
        route: '/adm/assessments',
        title: 'Avaliações',
        icon: ( <i className="fas fa-comment-alt-lines"></i> )  
    },
    {
        route: '/adm/requests',
        title: 'Pedidos',
        icon: ( <i className='fas fa-copy'/> )  
    },
    {
        route: '/adm/users',
        title: 'Usuários',
        icon: ( <i className='fas fa-users'/> )  
    },
    {
        route: '/adm/settings',
        title: 'Configurações',
        icon: ( <i className='fas fa-cogs'/> )  
    }
]


function ListOfMenuItems( { open, history } ) { return (

    <div className='itens-wrapper'>

{ backBoneListOfMenu.map(  ( iterator, index ) => (

        <Link to = { iterator.route } key = { index }>

            <div className={`flex horizontal menu-item ${ history.location.pathname === iterator.route  &&  'menu-item-active' }`}>

                <div className='flex flex-1 flex-center'>
                    { iterator.icon }
                </div>

{ open  &&  ( 
                <div className='flex flex-2 flex-start'> 
                    <span>{ iterator.title }</span> 
                </div> 
)}

            </div>

        </Link>

))}

    </div>

)}


export default ListOfMenuItems