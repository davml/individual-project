import React, { useState, useEffect } from 'react';
import classes from './jobSettings.css';
import ReactDom from 'react-dom';

import { updateJobState } from '../../../../../../redux/actions/auth';
import Verify from '../../../modals/verification/verify';

import { useDispatch, useSelector } from 'react-redux';

const JobSettings = (props) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState(useSelector((state) => state?.user));

    const [verifyModal, setVerifyModal] = useState(false);
    const toggle = () => setVerifyModal(!verifyModal);

    const [currentUser, setCurrentUser] = useState(null);

    const [request, setRequest] = useState(null);

    let applicants = [];
    let test = useSelector((state) => state?.user)?.map(((user) => {applicants?.push(user)}));
    console.log(applicants);

    const job = props?.job;
    let applicantsList = [];

    const handleStateUpdate = (userId, newState) => {
        dispatch(updateJobState(userId, job?._id, newState));
        props?.setModal(false);
    }

    const updateApplicants = () => {
        if(applicants){
            applicantsList = applicants?.map((user) => <li>
                <div className={classes["user-details"]}>
                    {user?.name?.forename} {user?.name?.middlename} {user?.name?.surname} - {user?.cv?.biography?.substr(0, 30)}
                </div>
                <div className={classes["user-actions"]}>
                    <button className={classes["show-user"]}>Show User</button>
                    <i onClick={()=>{setRequest("REJECT_APPLICANT"); setCurrentUser(user); setVerifyModal(true);}} class="far fa-times-circle"></i>
                    <i onClick={()=>{setRequest("ACCEPT_APPLICANT"); setCurrentUser(user); setVerifyModal(true);}} class="far fa-check-circle"></i>
                </div>
            </li>)
        }
    }

    useEffect(() => {
        updateApplicants();
    }, [props?.modal===true])

    useEffect(() => {
        if(users){
            applicantsList = users?.map((user) => <li>
                <div className={classes["user-details"]}>
                    {user?.name?.forename} {user?.name?.middlename} {user?.name?.surname} - {user?.cv?.biography?.substr(0, 30)}
                </div>
                <div className={classes["user-actions"]}>
                    <button className={classes["show-user"]}>Show User</button>
                    <i class="far fa-check-circle"></i>
                    <i class="far fa-times-circle"></i>
                    
                </div>
            </li>)
        }
    }, [useSelector((state) => state?.user)])


    updateApplicants();
    

    const handleUpdate = (e) => {
        e.preventDefault();

        // update settings
    }

    if(props?.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={()=>{props?.setModal(false); setUsers(null)}} />

                <div className={classes["modal"]}>
                    <div className={classes["modal-heading"]}>
                        <h1>{job?.title} - Applicants</h1>
                    </div>
                    <div className={classes["modal-content"]}>
                        <ul>
                            {applicantsList ? applicantsList : "No Applicants Found"}
                        </ul>
                    </div>
                </div>

                <Verify modal={verifyModal} setModal={setVerifyModal} toggle={toggle} job={job} user={currentUser} request={request}/>
            </>,
            document.getElementById('portal')
        )
    }
    else {
        return null;
    }
}

export default JobSettings;