import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccount, updateAccount } from '../../../../../redux/actions/auth';
import classes from './Profile.css';


const Profile = (props) => {

    const dispatch = useDispatch();
    const userId = "603fd62201a14890bcaa3b43";

    const user = useSelector((state) => state.user);
    console.log(user);

    useEffect(() => {
        dispatch(getAccount(userId));
    }, [])

    return (
        <div className={classes["profile-wrapper"]}>
            <div className={classes["user-profile"]}>
                <div className={classes["user-profile-details"]}>
                    <div className={classes["user-img"]}>
                    </div>

                    <div className={classes["user-basic-details"]}>
                        <div className={classes["user-basic-details-username"]}>
                            <p className={classes["user-name"]}>
                                {user?.name?.forename} {user?.name?.middlename} {user?.name?.surname}
                            </p>
                        </div>
                        <div className={classes["user-basic-details-userbio"]}>
                            <p className={classes["user-bio"]}>
                                {user?.cv?.biography}
                            </p>
                        </div>
                    </div>
                </div>

                

                <div className={classes["user-profile-cv"]}>
                    <div className={classes["cv-column"]}>
                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY BIOGRAPHY</h1>
                            </div>
                        </div>

                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY EXPERIENCE</h1>
                            </div>
                        </div>
                    </div>

                    <div className={classes["cv-column"]}>
                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY EDUCATION</h1>
                            </div>
                        </div>

                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY SKILLS</h1>
                            </div>
                        </div>
                    </div>

                    <div className={classes["cv-column"]}>
                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>CONTACT DETAILS</h1>
                            </div>
                        </div>

                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>OYT EXPERIENCE</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Profile;