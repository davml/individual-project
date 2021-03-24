import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './verify.css';

import { deleteJob } from '../../../../../redux/actions/jobs';
import { updateJobState } from '../../../../../redux/actions/auth';

const Verify = (props) => {
    const dispatch = useDispatch();
    let request = props?.request;
    let job = props?.job;
    let user = props?.user;

    const handleDelete = () => {
        dispatch(deleteJob(job?._id));
        props?.setModal(false);
    }

    const handleNewState = (newState) => {
        dispatch(updateJobState(user?._id, job?._id, newState));
        props?.setModal(false);
    }

    let display;
    switch(request) {
        case "DELETE_JOB":
            display = (
                <div className={classes["verify-form"]}>
                    <p>Are you sure you want to delete the job:</p><p>{job?.title}</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={()=>props?.setModal(false)}>No</button>
                </div>
            )
            break;
        case "ACCEPT_APPLICANT":
            display = (
                <div className={classes["verify-form"]}>
                    <p>Are you sure you want to accept the applicant:</p><p>{user?.name?.forename} {user?.name?.surname}</p>
                    <button onClick={()=>handleNewState("active")}>Yes</button>
                    <button onClick={()=>props?.setModal(false)}>No</button>
                </div>
            )
            break;
        case "REJECT_APPLICANT":
            display = (
                <div className={classes["verify-form"]}>
                    <p>Are you sure you want to reject the applicant:</p><p>{user?.name?.forename} {user?.name?.surname}</p>
                    <button onClick={()=>handleNewState("rejected")}>Yes</button>
                    <button onClick={()=>props?.setModal(false)}>No</button>
                </div>
            )
            break;
        case "JOB_COMPLETE":
            display = (
                <div className={classes["verify-form"]}>
                    <p>Are you sure you want to complete the job:</p><p>{job?.title}</p>
                    <button onClick={()=>handleNewState("completed")}>Yes</button>
                    <button onClick={()=>props?.setModal(false)}>No</button>
                </div>
            )
            break;
        default:
            break;
    }


    if(props?.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    {display}
                </div>
            </>,
            document.getElementById('portal')
        )
    }
    else {
        return null;
    }
}

export default Verify;