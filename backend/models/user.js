import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true, maxlength:50 },
    password: { type: String, required: true },
    id: { type: String },
    name: {
        forename: { type: String, required: false, maxlength: 30, minlength: 1 },
        surname: { type: String, required: false, maxlength: 30, minlength: 1 },
        middlename: { type: String, required: false, maxlength: 30, minlength: 1 }
    },
    gender: {type: String, enum: ['Undefined', 'Male', 'Female']},
    location: {type: String, required: false, maxlength: 50, minlength: 1 },
    date_of_birth: {type: Date, required: false},
    jobs: {
        active: [String],
        pending: [String],
        completed: [String],
        rejected: [String]
    },
    cv: {
        biography: { type: String, required: false, maxlength: 320 },
        education: {type: String, required: false, maxlength: 320},
        skills: {type: String, required: false, maxlength: 320},
        contactDetails: {type: String, required: false, maxlength: 320},
        experience: {type: String, required: false, maxlength: 320}
    },
    accountType: {type: String, required: true},
    selectedFile: String
})

export default mongoose.model("User", userSchema)