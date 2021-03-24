import React from 'react';
import classes from './jobsList.css';

import JobItem from './jobItem/jobItem';

const JobsList = (props) => {
    let jobsList = [];
    if(props?.jobs){
        jobsList = props?.jobs.map((job) => <div className={classes["job-item"]}><JobItem job={job}/></div>)
    }
    return(
        <div className={classes["jobs-container"]}>
            <div className={props?.jobs ? classes["jobs-display"] : null}>
                {jobsList}
            </div>
        </div>
    );
}

export default JobsList;