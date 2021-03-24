import React, { useEffect, useState } from 'react';
import classes from './search.css';
import { useDispatch, useSelector } from 'react-redux';

import JobsList from './jobsList/jobsList';

const Search = (props) => {
    /*let jobsList = props?.location?.searchProps?.search;*/

    let jobsList = useSelector((state) => state?.job);
    console.log(jobsList);

    useEffect(() => {
        setPageJobs(jobsList?.slice(0,10));
        setPage({page: 1});
        setNumPages(Math.ceil(jobsList?.length / 10));

        pagesArray = [];
        for(let i=0; i<numPages; i++){
            pagesArray?.push(i+1);            
        }
        setIndex(pagesArray.map(page => <p onClick={()=>setPage({page: page})} className={classes["index-select"]}>{page}</p>));
    }, [jobsList])

    const [pageJobs, setPageJobs] = useState(jobsList.slice(0, 10))
    let pagesArray = [];
    let indexStart;

    const [page, setPage] = useState({page: 1});
    const [numPages, setNumPages] = useState(Math.ceil(jobsList?.length / 10));

    const [index, setIndex] = useState(null);

    useEffect(() => {
        for(let i=0; i<numPages; i++){
            pagesArray?.push(i+1);            
        }
        setIndex(pagesArray.map(page => <p onClick={()=>setPage({page: page})} className={classes["index-select"]}>{page}</p>));
    }, [])
    
    useEffect(() => {
        indexStart = page?.page*10-10;
        console.log(indexStart);
        setPageJobs(jobsList.slice(indexStart, indexStart+10));
    }, [page])

    if(jobsList.length == 0){
        return (
            <div className={classes["search-container"]}>
                <div className={classes["search-container-2"]}>
                    <div className={classes["search-heading"]}>
                        <h1>Search Results...</h1>
                    </div>
                    <div className={classes["jobs-container"]}>
                        <h1>No Jobs Found, Please search again.</h1>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={classes["search-container"]}>
            <div className={classes["search-container-2"]}>
                <div className={classes["search-heading"]}>
                    <h1>Search Results...</h1>
                </div>
                <div className={classes["jobs-container"]}>
                    <JobsList jobs={pageJobs}/>
                </div>
                <div className={classes["page-selector"]}>
                    {index ? index : null}
                </div>
            </div>
        </div>
    );
}

export default Search;