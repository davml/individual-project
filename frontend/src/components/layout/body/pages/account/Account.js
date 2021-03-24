import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';

import classes from './account.css'

import Profile from './account-components/Profile/Profile';
import MyJobs from './account-components/Jobs/myJobs';
import { getAccount, getAccounts } from '../../../../../redux/actions/auth';

const Account = () => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(getAccount(currentUser?.result?._id));
    }, [])

    const [currentComponent, setCurrentComponent] = useState(<Profile />)
    useEffect(() => {
        dispatch(getAccount(currentUser?.result?._id));
    }, [currentComponent])

  
    return(
        <div className={classes["account-wrapper"]}>

            <div className={classes["account-dashboard"]}>

                <div className={classes["account-navbar"]}>

                    <div className={classes["navbar-links"]}>
                        <ul className={classes["links-ul"]}>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]} onClick={()=>setCurrentComponent(<Profile />)}><i class="fas fa-user"></i> My Profile</p>
                            </li>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]} onClick={()=>setCurrentComponent(<MyJobs />)}><i class="fas fa-calendar-alt"></i> My Jobs</p>
                            </li>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]}><i class="fas fa-envelope"></i> Inbox</p>
                            </li>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]}><i class="fas fa-cog"></i> Settings</p>
                            </li>

                        </ul>
                    </div>

                </div>

                <div className={classes["dashboard-display"]}>
                    {currentComponent}
                </div>

            </div>

        </div>
    );
}

export default Account;