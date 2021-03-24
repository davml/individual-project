import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FileBase from 'react-file-base64';

import classes from './businessProfile.css';

import { getBusinessAccount } from '../../../../../../../redux/actions/businessAuth';
import { updateBusinessAccount } from '../../../../../../../redux/actions/businessAuth';


const BusinessProfile = () => {

    const dispatch = useDispatch();
    const [businessData, setBusinessData] = useState(null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(getBusinessAccount(currentUser?.result?._id));
    }, [])

    const [user, setUser] = useState(useSelector(state => state.businessUser));
    useEffect(() => {
        if (user) setBusinessData(user);
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBusinessAccount(businessData._id, businessData));
        dispatch(getBusinessAccount(businessData?._id));
    }
    
    return (
        <div className={classes["profile-wrapper"]}>
            <form className={classes["user-profile"]} onSubmit={handleSubmit}>
                <div className={classes["user-heading"]}>
                    <h1>{businessData?.information?.businessName}</h1>
                    <div className={classes["save-button"]}>
                        <button>Save Details</button>
                    </div>
                </div>
                <div className={classes["user-details"]}>
                    <div className={classes["user-details-2"]}>
                        <div className={classes["user-details-info"]}>
                            <textarea placeholder="Business Biography" value={businessData?.information?.businessBio} className={classes["textarea-bio"]} onChange={(e) => setBusinessData({ ...businessData, information: {...businessData?.information, businessBio: e.target.value }})} maxlength="320"/>
                            <textarea placeholder="Business Type" value={businessData?.information?.businessType} className={classes["textarea-type"]} onChange={(e) => setBusinessData({ ...businessData, information: {...businessData?.information, businessType: e.target.value }})} maxlength="50"/>
                        </div>
                        <div className={classes["user-details-img"]}>
                            <img src={businessData?.information?.selectedFile} />
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setBusinessData({ ...businessData, information: {...businessData?.information, selectedFile: base64 }})} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )


}

export default BusinessProfile;