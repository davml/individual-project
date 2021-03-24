import React, { useState, useEffect } from 'react';

import ReactDom from 'react-dom';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { getBusinessAccount } from '../../../../../../redux/actions/businessAuth';

import { createJob } from '../../../../../../redux/actions/jobs';

import classes from './newJob.css';

const NewJob = (props) => {

    const dispatch = useDispatch();
    const [business, setBusiness] = useState(useSelector((state) => state.businessUser));
    const [businessData, setBusinessData] = useState(null)

    const [currentSkill, setCurrentSkill] = useState(null);

    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        payment: "",
        companyId: business?._id,
        applicants: {
            pending: [],
            rejected: [],
            successful: ""
        },
        timeline: {
            deadline: "",
            startDate: "",
            finishDate: ""
        },
        skills: [],
        selectedFile: ""
    });

    useEffect(() => {
        setBusinessData(business);
    }, [business]);

    useEffect(() => {
        setJobData({title: "",
        description: "",
        payment: "",
        companyId: business?._id,
        applicants: {
            pending: [],
            rejected: [],
            successful: ""
        },
        timeline: {
            deadline: "",
            startDate: "",
            finishDate: ""
        },
        skills: [],
        selectedFile: ""})
    }, [props?.modal])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createJob(jobData));
        dispatch(getBusinessAccount(businessData?._id))
        props?.setModal(false);
    }

    const handleSkill = (e) => {
        e.preventDefault();

        let skills = jobData?.skills;
        if(currentSkill){
            skills?.push(currentSkill)
        }
        setCurrentSkill(null);
        document.getElementById('skill').value="";

        setJobData({...jobData, skills: skills})
    }


    if(props.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    <div className={classes["modal-heading"]}>
                        <div className={classes["mh-1"]}>
                            <h1>New Job</h1>
                        </div>
                        <div className={classes["mh-2"]}>
                            <i onClick={props.toggle}class="fas fa-times"></i>
                        </div>
                    </div>

                    <div className={classes["modal-form-container"]}>
                        <form className={classes["modal-form"]} onSubmit={handleSubmit}>
                            <div className={classes["form-left"]}>
                                <div className={classes["form-left-item"]}>
                                    <label>Job Title: </label><input required="true" type="text" placeholder="eg React Web Developer" onChange={(e) => setJobData({ ...jobData, title: e.target.value })}/>
                                </div>
                                
                                <div className={classes["form-left-item"]}>
                                    <label>Payment: </label><input required="true" type="text" placeholder="eg. £25/ph" onChange={(e) => setJobData({ ...jobData, payment: e.target.value })}/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>Deadline: </label><input required="true" type="date" onChange={(e) => setJobData({ ...jobData, timeline: { ...jobData.timeline, deadline: e.target.value }})} />
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>Start Date: </label><input required="true" type="date" onChange={(e) => setJobData({ ...jobData, timeline: { ...jobData.timeline, startDate: e.target.value }})} />
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>End Date: </label><input required="true" type="date" onChange={(e) => setJobData({ ...jobData, timeline: { ...jobData.timeline, finishDate: e.target.value }})}/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <input type="text" id="skill" placeholder="eg. CSS" onChange={(e) => setCurrentSkill(e.target.value)}/>
                                    <button type="submit" onClick={handleSkill}>Add Skill</button>
                                </div>

                        

                                <div className={classes["form-left-item"]}>
                                    <label>Skills: </label><input type="text" value={jobData?.skills}/>
                                </div>
                                <div className={classes["form-left-item"]}>
                                    <button type="submit">Add Job</button>
                                </div>
                            </div>
                            <div className={classes["form-right"]}>
                                <div className={classes["form-right-desc"]}>
                                    <div className={classes["form-right-item"]}>
                                        <label>Job Title: </label><textarea required="true" placeholder="eg. This job involves developing a website for a clothing brand company..." onChange={(e) => setJobData({ ...jobData, description: e.target.value })}/>
                                    </div>
                                </div>

                                <div className={classes["form-right-img"]}>
                                    <img src={jobData?.selectedFile}className={classes["form-img"]} />
                                    <FileBase required="true" type="file" multiple={false} onDone={({ base64 }) => setJobData({ ...jobData, selectedFile: base64 })} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>,
            document.getElementById('portal')
        )
    }
    else {
        return null;
    }
}

export default NewJob;