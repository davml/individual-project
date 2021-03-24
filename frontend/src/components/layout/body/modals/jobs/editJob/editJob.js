import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './editJobs.css';

import Verify from '../../../modals/verification/verify';

const EditJob = (props) => {
    let job = props?.job;
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user);

    const [verifyModal, setVerifyModal] = useState(false);
    const toggleVerifyModal = () => setVerifyModal(!verifyModal);

    if(props?.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    <div className={classes["job-user"]}>
                        <div className={classes["job-user-details"]}>
                            <p>Name: {user?.name?.forename} {user?.name?.surname}</p>
                            <p>Biography: {user?.cv?.biography}</p>
                            <p>Skills: {user?.cv?.skills}</p>
                            <p>Education: {user?.cv?.education}</p>
                            <p>Experience: {user?.cv?.experience}</p>
                            <p></p>
                            <p>Contact Email: {user?.email}</p>
                            <p>You can use the contact details provided above to communicate with your chosen worker.</p>
                        </div>
                        <div className={classes["job-user-img"]}>
                            <img src={user?.selectedFile} />
                        </div>
                    </div>
                    <div className={classes["job-settings"]}>
                        {job?.jobState==="completed" ? <p>This job has now been completed.</p> : <button onClick={()=>setVerifyModal(true)}>Set This Job As Completed</button>}
                    </div>
                </div>

                <Verify modal={verifyModal} setModal={setVerifyModal} toggle={toggleVerifyModal} job={job} user={user} request="JOB_COMPLETE"/>
            </>,
            document.getElementById('portal')
        )
    }
    else {
        return null;
    }
}

export default EditJob;