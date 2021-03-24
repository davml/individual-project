import e from 'express';
import mongoose from 'mongoose';

import Job from '../models/job.js';
import businessUser from '../models/businessUser.js';
import User from '../models/user.js';

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json(jobs);   
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        
        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createJob = async (req, res) => {
    const { title, description, payment, timeline, companyId, applicants, skills, selectedFile } = req.body;
    const jobState = "application"
    const newJob = new Job({ title, description, payment, jobState, timeline, companyId, applicants, skills, selectedFile})

    try {

        let jobId = newJob._id;
        let businessId = newJob.companyId;

        await newJob.save();

        let business = await businessUser.findById(businessId);
        business?.jobs?.currentJobs.push(jobId);
        await businessUser.findByIdAndUpdate(businessId, business, { new: true })

        res.status(201).json(newJob);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, payment, timeline, companyId, applicants, skills, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform UPDATE - No job found with the ID: ${id}`);

    const updatedJob = { title, description, payment, timeline, companyId, applicants, skills, selectedFile };

    await Job.findByIdAndUpdate(id, updatedJob, { new: true })

    res.json(updatedJob);
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform DELETE - No job found with the ID: ${id}`);

    let job = await Job.findById(id);

    let business = await businessUser.findById(job?.companyId)
    let removeIndex = business?.jobs?.currentJobs.findIndex((e) => e == id);
    business?.jobs?.currentJobs?.splice(removeIndex,1);
    await businessUser.findByIdAndUpdate(business?._id, business, { new: true });
    
    let applicants = job?.applicants?.pending;
    let user;
    for(var i=0; i<applicants?.length; i++){
        user = await User.findById(applicants[i]);
        removeIndex = user?.jobs?.pending?.findIndex((e) => e == id);
        user?.jobs?.pending?.splice(removeIndex,1);
        await User.findByIdAndUpdate(user?._id, user, { new: true });
    }

    await Job.findByIdAndRemove(id);

    res.json({ message: "Job successfully deleted." })
}

export const searchJobs = async (req, res) => {
    try {
        let result = await Job.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${req.body.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ])
        res.send(result);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export const getSomeJobs = async (req, res) => {
    const { currentJobs, expiredJobs } = req.body;
    try {
        let jobsList = [];
        let job;
        for(let i=0; i<currentJobs?.length; i++){
            job = await Job.findById(currentJobs[i]);
            jobsList?.push(job);
        }
        for(let i=0; i<expiredJobs?.length; i++){
            job = await Job.findById(expiredJobs[i]);
            jobsList?.push(job);
        }
        res.status(200).json(jobsList);   
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateJobState = async (req, res) => {
    const { jobId, newState } = req.body;

    try {
        if(jobId===null){
            res.status(404).json("Unsuccessful");
        }
        if(newState==="completed"){
            let business = await Job.findById(job?.companyId);
    
            await Job.findByIdAndUpdate(job?._id, {jobState: newState}, { new: true });
            
            for(let i=0; i<business?.jobs?.currentJobs?.length; i++){
                if(business?.jobs?.currentJobs[i] === jobId){
                    business?.jobs?.currentJobs?.splice(i,1);
                    business?.jobs?.expiredJobs?.push(jobId);
                    await businessUser?.findByIdAndUpdate(business?._id, business, { new: true })
                }
            }
            res.status(200).json({business});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}