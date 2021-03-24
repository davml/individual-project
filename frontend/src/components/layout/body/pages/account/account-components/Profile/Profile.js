import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccount, updateAccount } from '../../../../../../../redux/actions/auth';

import FileBase from 'react-file-base64';

import classes from './Profile.css';


const Profile = () => {
    
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null)
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(getAccount(currentUser?.result?._id));
    }, [])

    const [user, setUser] = useState(useSelector(state => state.user));
    useEffect(() => {
        if (user) setUserData(user);
    }, [user]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAccount(userData._id, userData));
        dispatch(getAccount(userData?._id));
    }

    return (
        <div className={classes["profile-wrapper"]}>
            <div className={classes["user-profile"]}>
                <div className={classes["user-profile-details"]}>
                    <div className={classes["user-img"]}>
                        <img src={userData?.selectedFile} className={classes["profile-img"]}/>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setUserData({ ...userData, selectedFile: base64 })} />
                    </div>

                    <div className={classes["user-basic-details"]}>
                        <div className={classes["user-basic-details-username"]}>
                            <p className={classes["user-name"]}>
                                {userData?.name?.forename} {userData?.name?.surname}
                            </p>
                        </div>
                        <div className={classes["user-basic-details-userbio"]}>
                            <p className={classes["user-bio"]}>
                            </p>
                        </div>
                    </div>
                </div>

                <form className={classes["user-profile-cv"]} onSubmit={handleSubmit}>
                    <div className={classes["cv-column"]}>
                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY BIOGRAPHY</h1>
                            </div>
                            <div className={classes["cv-content"]}>
                                <textarea value={userData?.cv?.biography} name="biography" className={classes["cv-text-area"]} onChange={(e) => setUserData({...userData, cv: {...userData.cv, biography: e.target.value}})} maxlength="320"/>
                            </div>
                        </div>

                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY EXPERIENCE</h1>
                            </div>
                            <div className={classes["cv-content"]}>
                                <textarea value={userData?.cv?.experience} name="experience" className={classes["cv-text-area"]} onChange={(e) => setUserData({...userData, cv: {...userData.cv, experience: e.target.value}})} maxlength="320"/>
                            </div>
                        </div>
                    </div>

                    <div className={classes["cv-column"]}>
                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY EDUCATION</h1>
                            </div>
                            <div className={classes["cv-content"]}>
                                <textarea value={userData?.cv?.education} name="education" className={classes["cv-text-area"]} onChange={(e) => setUserData({...userData, cv: {...userData.cv, education: e.target.value}})} maxlength="320"/>
                            </div>
                        </div>

                        <div className={classes["cv-subcolumn"]}>
                            <div className={classes["cv-subcolumn-heading"]}>
                                <h1>MY SKILLS</h1>
                            </div>
                            <div className={classes["cv-content"]}>
                                <textarea value={userData?.cv?.skills} name="skills" className={classes["cv-text-area"]} onChange={(e) => setUserData({...userData, cv: {...userData.cv, skills: e.target.value}})} maxlength="320"/>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={classes["submit-btn"]}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;