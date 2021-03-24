import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './body/pages/home/home';
import Account from './body/pages/account/Account';
import Search from './body/pages/search/search';
import About from './body/pages/about/about';
import MyBusiness from './body/pages/mybusiness/mybusiness';
import oytBusiness from './body/pages/oytBusiness/oytBusiness';

import { getAccount } from '../../redux/actions/auth';
import { getBusinessAccount } from '../../redux/actions/businessAuth';


import classes from './layout.css';

import NavigationBar from './header/navigationBar';

const Layout = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        if(user){
            if(user?.result?.accountType==="Business"){
                dispatch(getBusinessAccount(user?.result?._id));
            }
            else {
                dispatch(getAccount(user?.result?._id));
            }
        }
    }, [])

    return (
        <Router>
            <div className={classes.layout}>
                <div className={classes.navbar}>
                    <NavigationBar user={user} setUser={setUser} />
                </div>

                <div className={classes.body}>
                    <Switch>
                        <Route path='/' exact component={Home} />
                    </Switch>
                    <Switch>
                        <Route path='/account' exact component={Account} />
                    </Switch>
                    <Switch>
                        <Route path='/business' exact component={oytBusiness} />
                    </Switch>
                    <Switch>
                        <Route path='/search' exact component={Search} />
                    </Switch>
                    <Switch>
                        <Route path='/about' exact component={About} />
                    </Switch>
                    <Switch>
                        <Route path='/mybusiness' exact component={MyBusiness} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Layout;