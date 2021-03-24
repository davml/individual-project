import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'
import classes from './businessAccountModal.css';
import ReactDom from 'react-dom';
import img from '../../../../../assets/images/businessWoman.jpg';
import oytimg from '../../../../../assets/images/logo.png';

import { useHistory } from 'react-router-dom';

import { businessSignIn, businessSignUp } from '../../../../../redux/actions/businessAuth'

const initialState = { email: '', password: '', confirmPassword: '', businessName: '' }

const BusinessAccountModal = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);

    const [click, setClick] = useState(props?.option);
    const toggleClick = () => setClick(!click);

    useEffect(() => {
        setClick(props?.option);
    }, [props?.option])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(click) {
            dispatch(businessSignUp(formData, history))
        } else {
            dispatch(businessSignIn(formData, history))
        }

        (props.setModal(false))
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    let selection;
    if(click){
        selection=(
            <>
            <form className={classes["form-contents"]} onSubmit={handleSubmit}>
                <input type="text" name="businessName" placeholder="Business Name" className={classes["form-element"]} required onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email Address" className={classes["form-element"]} required onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" className={classes["form-element"]} required onChange={handleChange}/>
                <input type="password" name="confirmPassword" placeholder="Re-enter Password" className={classes["form-element"]} required onChange={handleChange}/>
                <button type="submit" className={classes["form-submit"]}>Register</button>
                <div className={classes["oyt-div"]}>
                    <img src={oytimg} className={classes["oyt-img"]}/>
                </div>
            </form>
            </>
        )
    }
    else {
        selection = (
            <>
            <form className={classes["form-contents"]} onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email Address" className={classes["form-element"]} required onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" className={classes["form-element"]} required onChange={handleChange}/>
                <button type="submit" className={classes["form-submit"]}>Login</button>
                <div className={classes["oyt-div"]}>
                    <img src={oytimg} className={classes["oyt-img"]}/>
                </div>
            </form>
            </>
        )
    }


    if(props.modal) {
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                
                <div className={classes["modal"]}>
                    <div className={classes["modal-content"]}>

                        <div className={classes["account"]}>
                            <div className={classes["help-selection"]}>
                                <button className={click ? classes["selected-btn"] : classes["btn"]} onClick={()=>setClick(true)}>Register</button>
                                <button className={click ? classes["btn"] : classes["selected-btn"]} onClick={()=>setClick(false)}>Login</button>
                            </div>

                            <div className={classes["account-form"]}>
                                {selection}
                            </div>
                        </div>

                        <div className={classes["img-container"]}>
                            <img src={img} className={classes["img"]}/>
                        </div>
                    </div>
                </div>
            </>,
            document.getElementById('portal')
        );
    }
    else {
        return null;
    }
}

export default BusinessAccountModal;