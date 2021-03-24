import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getBusinessUserJobs } from '../../../../../../../redux/actions/businessAuth';
import { deleteJob } from '../../../../../../../redux/actions/jobs';
import { getAccount } from '../../../../../../../redux/actions/auth';

import NewJob from '../../../../modals/jobs/newJob/newJob';
import Job from '../../../../modals/jobs/existingJob/job';
import JobSettings from '../../../../modals/jobs/jobSettings/jobSettings';
import Verify from '../../../../modals/verification/verify';
import EditJob from '../../../../modals/jobs/editJob/editJob';

import classes from './businessJobs.css';
import { getSomeJobs } from '../../../../../../../redux/actions/jobs';
import { getJobApplicants } from '../../../../../../../redux/actions/auth';

const BusinessJobs = () => {
    const [newJobModal, setNewJobModal] = useState(false);
    const toggleNewJobModal = () => setNewJobModal(!newJobModal);

    const [modalSelection, setModalSelection] = useState();
 
    const [jobsSelection, setJobsSelection] = useState("Pending");

    const [jobModal, setJobModal] = useState(false);
    const toggleJobModal = () => setJobModal(!jobModal);

    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => setEditModal(!editModal);

    const [editJobsModal, setEditJobsModal] = useState(false);
    const toggleEditJobsModal = () => setEditJobsModal(!editJobsModal);

    const [verifyModal, setVerifyModal] = useState(false);
    const toggleVerifyModal = () => setVerifyModal(!verifyModal);

    const dispatch = useDispatch();
    const [business, setBusiness] = useState(useSelector((state) => state.businessUser));

    const [request, setRequest] = useState(null);

    const [businessData, setBusinessData] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        setBusinessData(business);

        dispatch(getSomeJobs(business?.jobs));
    }, []);

    const jobs = useSelector((state) => state.job);

    let pendingJobs, completedJobs = [];

    if(jobs){
        if(business?.jobs?.currentJobs){
            pendingJobs = jobs?.map((job) => business?.jobs?.currentJobs?.includes(job?._id) ? <li><div onClick={()=> {
                setJobModal(!jobModal);
                setSelectedJob(job);
            }}>{job?.title} - {job?.description} {job?.jobState==="application" ? <p>Applications Stage</p> : <p>Job is Currently Active</p>}</div>
                <div>
                    {job?.jobState==="application" ? <div><i onClick={()=>{setRequest("DELETE_JOB"); setSelectedJob(job); setVerifyModal(true);}} class="fas fa-trash-alt"></i><i class="fas fa-edit" onClick={()=>{setSelectedJob(job); dispatch(getJobApplicants(job?.applicants?.pending)); setEditModal(true); setModalSelection("applicants");}}></i></div> : 
                    job?.jobState==="active" ? <div><i  onClick={()=>{setSelectedJob(job); dispatch(getAccount(job?.applicants?.successful)); setEditJobsModal(true); setModalSelection("successful");}}class="fas fa-cog"></i></div> : null}
                </div></li> : null);
            pendingJobs = pendingJobs.filter(job => job !== null);
        }

        if(business?.jobs?.expiredJobs){
            completedJobs = jobs?.map((job) => business?.jobs?.expiredJobs?.includes(job?._id) ? <li><div onClick={()=> {
                setJobModal(!jobModal);
                setSelectedJob(job);
            }}>{job?.title} - {job?.description} <p>Job is Completed</p></div><div><i  onClick={()=>{setSelectedJob(job); dispatch(getAccount(job?.applicants?.successful)); setEditJobsModal(true); setModalSelection("successful");}}class="fas fa-cog"></i></div></li> : null);
            completedJobs = completedJobs.filter(job => job !== null);
        }
    }

    return(
        <div className={classes["jobs-container"]}>
            <div className={classes["jobs-container-2"]}>
                <div className={classes["jobs-selector"]}>
                    <div className={jobsSelection==="Pending" ? classes["jobs-heading-active"] : classes["jobs-heading"]} onClick={()=>setJobsSelection("Pending")}>Active</div>
                    <div className={jobsSelection==="Completed" ? classes["jobs-heading-active"] : classes["jobs-heading"]} onClick={()=>setJobsSelection("Completed")}>Completed</div>
                    <button onClick={toggleNewJobModal} className={classes["new-job"]}>New Job <i class="fas fa-plus"></i></button>
                </div>

                <div className={classes["jobs-display"]}>
                    <ul>
                        {jobsSelection === "Pending" ? pendingJobs : null}
                        {jobsSelection === "Completed" ? completedJobs: null}
                    </ul>
                    <div>
                        <NewJob modal={newJobModal} setModal={setNewJobModal} toggle={toggleNewJobModal}/>
                        <Job modal={jobModal} setModal={setJobModal} toggle={toggleJobModal} job={selectedJob}/>

                        {modalSelection==="applicants" ? <JobSettings modal={editModal} setModal={setEditModal} toggle={toggleEditModal} job={selectedJob} /> : <EditJob modal={editJobsModal} setModal={setEditJobsModal} toggle={toggleEditJobsModal} job={selectedJob}/>}

                        <Verify request = {request} modal={verifyModal} setModal={setVerifyModal} toggle={toggleVerifyModal} job={selectedJob}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessJobs;