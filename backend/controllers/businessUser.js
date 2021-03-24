import bcrypt from 'bcryptjs';
import e from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/businessUser.js';
import Job from '../models/job.js';

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
    const { email, password, confirmPassword, businessName} = req.body;

    try {
        const currentUser = await User.findOne({ email });

        if(currentUser) return res.status(400).json({ message: 'An account with this email already exists.' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match, please try again.'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, accountType: "Business", information: {businessName: businessName,businessType: null,businessBio: null,selectedFile: null}, jobs: {currentJobs: [],expiredJobs: []}})

        const token = jwt.sign({ email: result.email, id: result._id, accountType: result.accountType }, 'test', { expiresIn: "1h" });

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
    const { information, jobs } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform UPDATE - No user account found with the ID: ${id}`);

    const updatedUser = { information, jobs };

    await User.findByIdAndUpdate(id, updatedUser, { new: true })

    res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Unable to perform DELETE - No user account found with the ID: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User successfully deleted." })
}

export const getJobs = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        let jobs = [];
        var i;
        for(i=0; i < user?.jobs?.currentJobs.length; i++){
            jobs.push(await Job.findById(user?.jobs?.currentJobs[i]));
        }
        console.log(jobs);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}