import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessAccount } from '../../../../../../redux/actions/businessAuth';
import classes from './job.css';
import { userJobApply } from '../../../../../../redux/actions/auth';

import Business from '../../business/business';

const Job = (props) => {
    const [user, setUser] = useState(useSelector((state) => state?.user));
    const [businessUser, setBusinessUser] = useState(useSelector((state) => state?.businessUser));
    const dispatch = useDispatch();

    const [jobModal, setJobModal] = useState(false);
    const toggleJobModal = () => setJobModal(!jobModal);

    const userApply = (e) => {
        e.preventDefault();

        dispatch(userJobApply(user?._id, props?.job?._id));
        props?.setModal(false);
    }
    
    if(props?.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    <div className={classes["modal-heading"]}>
                        <div className={classes["mh-1"]}>
                            <h1>{props?.job?.title}</h1>
                        </div>
                        <div className={classes["mh-2"]}>
                            <i onClick={props.toggle}class="fas fa-times"></i>
                        </div>
                    </div>

                    <div className={classes["modal-form-container"]}>
                        <form className={classes["modal-form"]}>
                            <div className={classes["form-left"]}>
                                <div className={classes["form-left-item"]}>
                                    <label>Job Title: </label><input value={props?.job?.title} required="true" type="text" />
                                </div>
                                
                                <div className={classes["form-left-item"]}>
                                    <label>Payment: </label><input value={props?.job?.payment} required="true" type="text"/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>Deadline: </label><input value={props?.job?.timeline?.deadline} required="true" type="text"/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>Start Date: </label><input value={props?.job?.timeline?.finishDate} required="true" type="text" />
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>End Date: </label><input value={props?.job?.timeline?.startDate} required="true" type="text"/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <label>Skills: </label><input type="text" value={props?.job?.skills}/>
                                </div>

                                <div className={classes["form-left-item"]}>
                                    <div className={classes["form-btns"]}>
                                        <button onClick={(e) => {e.preventDefault(); dispatch(getBusinessAccount(props?.job?.companyId)); setJobModal(true);}}>View Business</button>
                                        { !JSON.parse(localStorage.getItem('profile')) || JSON.parse(localStorage.getItem('profile'))?.result?.accountType==="Business" ? null : (user?.jobs?.pending?.includes(props?.job?._id) || user?.jobs?.rejected?.includes(props?.job?._id) || props?.job?.jobState!=="application" ? <button disabled="true">Unable to apply for this vacancy.</button> : <button onClick={userApply}>Apply for Job</button>)}
                                    </div>
                                </div>
                            </div>
                            
                            <div className={classes["form-right"]}>
                                <div className={classes["form-right-desc"]}>
                                    <div className={classes["form-right-item"]}>
                                        <label>Job Description: </label><textarea value={props?.job?.description} required="true"/>
                                    </div>
                                </div>

                                <div className={classes["form-right-img"]}>
                                    <img src={props?.job?.selectedFile}className={classes["form-img"]} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Business modal={jobModal} setModal={setJobModal} toggle={toggleJobModal} />
            </>,
            document.getElementById('portal')
            
        )
    }
    else {
        return null;
    }
}

export default Job;