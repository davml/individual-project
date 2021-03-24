import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { Link } from 'react-router-dom';

import classes from './sidebar.css';

const Sidebar = (props) => {
    if(props.modal) {
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    <div className={classes["modal-heading"]}>
                        <p className={classes.mobileLogoContent}><i class="far fa-clock"></i>n Your Terms</p>
                        <div className={classes["modal-close"]}>
                            <i onClick={props.toggle}class="fas fa-times"></i>
                        </div>
                    </div>

                    <div className={classes["modal-body"]}>
                        <div className={classes["body-search"]}>
                            <div className={classes.searchbox}>
                                <input type="text" placeholder="Search..."/>
                                <button type="submit"><i class="fas fa-search"></i></button>
                            </div>
                        </div>

                        <div className={classes["links-div"]}>
                            <ul className={classes["links-ul"]}>
                                <li className={classes["links-li"]}>
                                    <Link to='/' className={classes["links-link"]}>
                                        <i class="fas fa-home"></i> Home
                                    </Link>
                                </li>
                                <li className={classes["links-li"]}>
                                    <Link to='/' className={classes["links-link"]}>
                                        <i class="fas fa-question"></i> About
                                    </Link>
                                </li>
                                <li className={classes["links-li"]}>
                                    <Link to='/' className={classes["links-link"]}>
                                        <i class="fas fa-briefcase"></i> OYT Business
                                    </Link>
                                </li>
                                <li className={classes["links-li"]}>
                                    <Link to='/signin' className={classes["links-link"]}>
                                        <i class="fas fa-sign-in-alt"></i> Sign In
                                    </Link>
                                </li>
                                <li className={classes["links-li"]}>
                                    <Link to='/signin' className={classes["links-link"]}>
                                        <i class="fas fa-user-plus"></i> Sign Up
                                    </Link>
                                </li>
                            </ul>
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

export default Sidebar;