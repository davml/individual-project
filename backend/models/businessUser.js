import mongoose from 'mongoose';

const businessUserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    accountType: {type: String, required: true },
    information: {
        businessName: {type: String, required: true, maxlength: 50},
        businessType: {type: String, required: false, maxlength: 50},
        businessBio: {type: String, required: false, maxlength: 320},
        selectedFile: {type: String, required: false}
    },
    jobs: {
        currentJobs: [{type: String, required: false}],
        expiredJobs: [{type: String, required: false}]
    }
})

export default mongoose.model("businessUser", businessUserSchema)