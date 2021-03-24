import bcrypt from 'bcryptjs';
import e from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Job from '../models/job.js';
import businessUser from '../models/businessUser.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const currentUser = await User.findOne({ email });

        if(!currentUser) return res.status(404).json({ message: 'User account does not exist.'});

        const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid password.'});

        const token = jwt.sign( {email: currentUser, id: currentUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: currentUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...'});
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, forename, surname } = req.body;

    try {
        const currentUser = await User.findOne({ email });

        if(currentUser) return res.status(400).json({ message: 'An account with this email already exists.' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match, please try again.'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: {forename, surname, middlename:null}, gender:'Undefined', location:null, date_of_birth:null, jobs: {active: [],pending: [],completed: [], rejected: []}, cv: {biography: null,education: null,skills: null,contactNumber: null,experience: null}, accountType: "Freelance", selectedFile: null })

        const token = jwt.sign({ email: result.email, id: result._id, }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...'});
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);   
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, gender, location, date_of_birth, jobs, cv, accountType, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform UPDATE - No user account found with the ID: ${id}`);

    const updatedUser = { name, gender, location, date_of_birth, jobs, cv, accountType, selectedFile };

    await User.findByIdAndUpdate(id, updatedUser, { new: true })

    res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform DELETE - No user account found with the ID: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User successfully deleted." })
}

export const userJobApply = async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        if(!userId || !jobId){
            res.status(404).json("Failed");
        }
        else {
            const user = await User.findById(userId);
            const job = await Job.findById(jobId);

            let userJobs = user;
            userJobs?.jobs?.pending?.push(job?._id);
            await User.findByIdAndUpdate(user?._id, userJobs, { new: true })
            
            let jobsList = job;
            jobsList?.applicants?.pending?.push(user?._id);
            await Job.findByIdAndUpdate(job?._id, jobsList, { new: true })

            res.status(200).json("Success");
            }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }   
}

export const userJobDelete = async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        let userJobs = user;
        for( var i=0; i<userJobs?.jobs?.pending?.length; i++){
            if(userJobs?.jobs?.pending[i] === jobId) {
                userJobs?.jobs?.pending?.splice(i, 1);
            }
        }
        await User.findByIdAndUpdate(user?._id, userJobs, { new: true })


        let jobsList = job;
        for( var i=0; i<jobsList?.applicants?.pending?.length; i++){
            if(jobsList?.applicants?.pending[i] === userId) {
                jobsList?.applicants?.pending?.splice(i, 1);
            }
        }
        await Job.findByIdAndUpdate(job?._id, jobsList, { new: true })

        res.status(200).json("Success");
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getJobApplicants = async (req, res) => {
    let { users } = req.body;
    try {
        let userList = [];
        for(var i=0; i<users?.length; i++){
            userList.push(await User.findById(users[i]));
        }
        res.status(200).json(userList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateJobState = async (req, res) => {
    const { userId, jobId, newState } = req.body;
    try {
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);
        const business = await businessUser.findById(job?.companyId);
        switch(newState){
            case "active":
                //Job Pending -> Successful
                //Remove all other applicants from job
                for(var i=0; i<job?.applicants?.pending?.length; i++){
                    if(job?.applicants?.pending[i]===userId){
                        job?.applicants?.pending?.splice(i,1);
                        await Job.findByIdAndUpdate(jobId, {applicants: {
                            pending: [],
                            rejected: job?.applicants?.pending,
                            successful: userId
                        }, jobState: "active"}, { new: true })
                    }
                }

                //User Pending -> Active
                for(var i=0; i<user?.jobs?.pending?.length; i++){
                    if(user?.jobs?.pending[i]===jobId){
                        user?.jobs?.pending?.splice(i,1);
                        user?.jobs?.active?.push(jobId);

                        await User.findByIdAndUpdate(userId, user, { new: true })
                    }
                }

                break;
                
            case "completed":
                //User Active -> Completed
                for(var i=0; i<user?.jobs?.active?.length; i++){
                    if(user?.jobs?.active[i]===jobId){
                        user?.jobs?.active?.splice(i,1);
                        user?.jobs?.completed?.push(jobId);

                        await User.findByIdAndUpdate(userId, user, { new: true })
                    }
                }

                for(var i=0; i<business?.jobs?.currentJobs?.length; i++){
                    if(business?.jobs?.currentJobs[i] === jobId){
                        business?.jobs?.currentJobs?.splice(i,1);
                        business?.jobs?.expiredJobs?.push(jobId);
                        await businessUser?.findByIdAndUpdate(business?._id, business, { new: true });
                    }
                }

                await Job.findByIdAndUpdate(jobId, {jobState: "completed"})

                break;

                
                //Job Completed = True
            case "rejected":
                //User Pending -> Rejected
                for(var i=0; i<user?.jobs?.pending?.length; i++){
                    if(user?.jobs?.pending[i]===jobId){
                        user?.jobs?.pending?.splice(i,1);
                        user?.jobs?.rejected?.push(jobId);

                        await User.findByIdAndUpdate(userId, user, { new: true })
                    }
                }

                //Job Pending -> Rejected
                for(var i=0; i<job?.applicants?.pending?.length; i++){
                    if(job?.applicants?.pending[i]===userId){
                        job?.applicants?.pending?.splice(i,1);
                        job?.applicants?.rejected?.push(userId);

                        await Job.findByIdAndUpdate(jobId, job, { new: true })
                    }
                }

                break;
        }

        res.status(200).json("Success")
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}