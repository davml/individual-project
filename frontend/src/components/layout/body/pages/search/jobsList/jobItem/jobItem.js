import React, { useState } from 'react';
import classes from './jobItem.css';

import Job from '../../../../modals/jobs/existingJob/job';

const JobItem = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    let job = props?.job;
    return (
        <div className={classes["job-item"]}>
            <div className={classes["job-title"]}>
                <p>Title: {job?.title}</p>
            </div>
            <div className={classes["job-description"]}>
                <p>Description: {job?.description}</p>
            </div>
            <div className={classes["job-payment"]}>
                <p>Payment: {job?.payment}</p>
            </div>
            <div className={classes["job-more"]}>
                <button onClick={toggleModal}>See More</button>
                <Job job={job} modal={modal} setModal={setModal} toggle={toggleModal} />
            </div>
        </div>
    )
}

export default JobItem;