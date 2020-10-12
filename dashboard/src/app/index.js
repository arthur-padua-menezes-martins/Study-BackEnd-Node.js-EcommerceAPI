//BASIC MODULES
import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

//ADM Skeleton
import SkeletonDashboard from './containers/HigherOrderComponents/SkeletonDashboard.js'

//ADM Containers
import Requests from './containers/Requests'
import Request from './containers/Requests/Request'
import Users from './containers/Users'
import User from './containers/Users/User'
import Categories from './containers/Categories'
import Category from './containers/Categories/Category'
import Products from './containers/Products'
import Product from './containers/Products/Product'
import NewProduct from './containers/Products/NewProduct'
import Assessments from './containers/Assessments'
import Assessment from './containers/Assessments/Assessment'
import Settings from './containers/Settings'

//Users Containers 
import Login from './containers/Login'
import Register from './containers/Register'
import RecoveryPassword from './containers/RecoveryPassword'
import NewPassword from './containers/NewPassword'

//State
import store from './GlobalState/store.js'


class App extends Component {
  render() {
    return (


      <Provider store={store}>

        <Router>

          <div className='App'>

            <Route exact path={'/adm/requests'} component={SkeletonDashboard(Requests)} />
            <Route exact path={'/adm/request/:_id'} component={SkeletonDashboard(Request)} />

            <Route exact path={'/adm/users'} component={SkeletonDashboard(Users)} />
            <Route exact path={'/adm/user/:_id'} component={SkeletonDashboard(User)} />

            <Route exact path={'/adm/categories'} component={SkeletonDashboard(Categories)} />
            <Route exact path={'/adm/category/:_id?'} component={SkeletonDashboard(Category)} />

            <Route exact path={'/adm/products'} component={SkeletonDashboard(Products)} />
            <Route exact path={'/adm/product/:_id?'} component={SkeletonDashboard(Product)} />
            <Route exact path={'/adm/new-product'} component={SkeletonDashboard(NewProduct)} />

            <Route exact path={'/adm/assessments/:_id?'} component={SkeletonDashboard(Assessments)} />
            <Route exact path={'/adm/assessment/:_id?'} component={SkeletonDashboard(Assessment)} />

            <Route exact path={'/adm/settings'} component={SkeletonDashboard(Settings)} />


            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/recovery-password'} component={RecoveryPassword} />
            <Route exact path={'/new-password'} component={NewPassword} />

          </div>

        </Router>

      </Provider>


    )
  }
}


export default App
