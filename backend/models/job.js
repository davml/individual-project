import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: {type: String, required: true, maxlength:50},
    description: {type: String, required: true, maxlength:200},
    payment: {type: String, required: true, maxlength: 30},
    jobState: {type: String},
    timeline: {
        deadline: { type: Date },
        startDate: { type: Date },
        finishDate: { type: Date }
    },
    companyId: {type: String, required: true },
    applicants: {
        pending: [String],
        rejected: [String],
        successful: { type: String } 
    },
    skills:[{type: String}],
    id: { type: String },
    selectedFile: {type: String}
})

export default mongoose.model("Job", jobSchema)