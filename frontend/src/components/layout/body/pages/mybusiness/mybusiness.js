import React, { useState, useEffect} from 'react';

import classes from './mybusiness.css';

import BusinessProfile from './businessComponents/businessProfile/businessProfile';
import BusinessJobs from './businessComponents/businessJobs/businessJobs';

import { getBusinessAccount } from '../../../../../redux/actions/businessAuth';


import { useDispatch, useSelector } from 'react-redux'

const MyBusiness = () => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(getBusinessAccount(currentUser?.result?._id));
    }, [])

    const [currentComponent, setCurrentComponent] = useState(<BusinessProfile />)
    useEffect(() => {
        dispatch(getBusinessAccount(currentUser?.result?._id));
    }, [currentComponent])

    return(
        <div className={classes["account-wrapper"]}>

            <div className={classes["account-dashboard"]}>

                <div className={classes["account-navbar"]}>

                    <div className={classes["navbar-links"]}>
                        <ul className={classes["links-ul"]}>
                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]} onClick={()=>setCurrentComponent(<BusinessProfile />)}><i class="fas fa-house-user"></i> My Business</p>
                            </li>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]} onClick={()=>setCurrentComponent(<BusinessJobs />)}><i class="fas fa-calendar-alt"></i>My Jobs</p>
                            </li>

                            <li className={classes["links-li"]}>
                                <p className={classes["links-link"]}><i class="fas fa-edit"></i> Reviews</p>
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

export default MyBusiness;