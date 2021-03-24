import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { businessSignIn, businessSignUp } from '../../../../../redux/actions/businessAuth';

const initialState = { email: '', password: '', confirmPassword: '' }

const Business = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);

    const [click, setClick] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(click) {
            dispatch(businessSignUp(formData, history))
        } else {
            dispatch(businessSignIn(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
            <button type="submit" >Login</button>
        </form>
    )
}

export default Business;