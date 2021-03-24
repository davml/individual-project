import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'
import classes from './accountModal.css';
import ReactDom from 'react-dom';
import img from '../../../../../assets/images/modalbackground.jpg';
import oytimg from '../../../../../assets/images/logo.png';

import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import { signin, signup } from '../../../../../redux/actions/auth'

const initialState = { email: '', password: '', confirmPassword: '', forename: '', surname: '' }

const AccountModal = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);

    const [click, setClick] = useState(props?.option);

    useEffect(() => {
        setClick(props?.option);
    }, [props?.option])

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })

            setClick(!click);
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later.")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(click) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
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
                <div className={classes["form-names"]}>
                    <input type="text" name="forename" placeholder="Forename" className={classes["form-element-names"]} required onChange={handleChange} />
                    <input type="text" name="surname" placeholder="Surname" className={classes["form-element-names"]} requried onChange={handleChange} />
                </div>
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

                <GoogleLogin 
                    clientId="637249509494-fa84dhgkddl1s53i2mohh90hbnpvrpd2.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button 
                        className={classes["googleButton"]} 
                        fullWidth onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<i class="fab fa-google"></i>} 
                        varient="contained"
                        ><i class="fab fa-google"></i> Google Sign In</button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />

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

export default AccountModal;