import React, { useState, useEffect } from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import logo from '../../../assets/images/site-logo.png'
import classes from './navigationBar.css';

import AccountModal from '../body/modals/account/accountModal';
import BusinessAccountModal from '../body/modals/businessAccount/businessAccountModal';
import Sidebar from '../body/modals/sidebar/sidebar';
import { searchJobs } from '../../../redux/actions/jobs';

const NavigationBar = (props) => {

    const [search, setSearch] = useState(null);

    useEffect(() => {
        dispatch(searchJobs({"query":search}))
    }, [search])

    const jobs = useSelector((state) => state.job);
    let jobsList = [];
    if(jobs){
        jobsList = jobs.map((job) => <Link className={classes.dropdownLink}>{job?.title}</Link>);
    }

    const [option, setOption] = useState(true);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [userModal, setUserModal] = useState(false);
    const toggleUserModal = () => setUserModal(!userModal);

    const [businessModal, setBusinessModal] = useState(false);
    const toggleBusinessModal = () => setBusinessModal(!businessModal);

    const userData = localStorage.getItem("profile");
    const user = JSON.parse(userData);

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    let displayContent;

    const handleSearch = (e) => {
        e.preventDefault();

        console.log(search);
    }
    
    const logout = () => {
        dispatch({ type: 'LOGOUT_USER' });

        history.push('/');
    };

    const logoutBusiness = () => {
        dispatch({ type: 'LOGOUT_BUSINESS' });

        history.push('/');
    };

    useEffect(() => {
        const token = props.user?.token;

        props.setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    if(user) {
        displayContent=(<div></div>)
        if(user?.result?.accountType === "Freelance"){
            displayContent = (
                <div className={classes.navbar}>

                    <div className={classes.logo}>
                        <Link to='/' className={classes.desktop}>
                            <img src={logo} alt="On Your Terms" className={classes.img}/>
                        </Link>
                    </div>

                    
                    <div className={classes.linksDiv}>
                        <ul className={classes.linksList}>
                            <li className={classes.link}>
                                <Link to='/' className={classes.navlink}>
                                    <i class="fas fa-home"></i> Home
                                </Link>
                            </li>

                            <li className={classes.navitem}>
                                <div className={classes.dropdown}>
                                    <Link to='/account' className={classes.navlink}>
                                        Account <i class="fa fa-caret-down"></i>
                                    </Link>

                                    <div className={classes.dropdownContent}>
                                        <Link to = '/account' className={classes.dropdownLink}>My Account</Link>
                                        <Link to = '/' className={classes.dropdownLink} onClick={logout}>Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={classes.searchWrapper}>
                        <form onSubmit={handleSearch}className={classes.searchbox}>
                            <input type="text" placeholder="Search..." onChange={(e) => {setSearch(e.target.value)}}/>
                            <Link to={{pathname:'/search', searchProps:{search:jobs}}}>
                                <button type="submit"><i class="fas fa-search"></i></button>
                            </Link>
                        </form>
                    </div>

                    <div className={classes.inboxWrapper}>
                        <Link to='/inbox' className={classes.navlink}>
                            <i class="fas fa-envelope"></i>
                        </Link>
                    </div>

                    <div className={classes.mobileWrapper}>
                        <div className={classes.mobileSidebar}>
                            <i onClick={toggleModal} class="fas fa-bars"></i>
                            <Sidebar modal={modal} toggle={toggleModal}/>
                        </div>
                        <div className={classes.mobileLogo}>
                            {!modal ? <p className={classes.mobileLogoContent}><i class="far fa-clock"></i>n Your Terms</p> : null}
                        </div>
                    </div>

                    
                </div>
            )
        }
        else if(user?.result?.accountType === "Business"){
            displayContent = (
                <div className={classes.navbar}>

                    <div className={classes.logo}>
                        <Link to='/' className={classes.desktop}>
                            <img src={logo} alt="On Your Terms" className={classes.img}/>
                        </Link>
                    </div>

                    
                    <div className={classes.linksDiv}>
                        <ul className={classes.linksList}>
                            <li className={classes.link}>
                                <Link to='/' className={classes.navlink}>
                                    <i class="fas fa-home"></i> Home
                                </Link>
                            </li>

                            <li className={classes.navitem}>
                                <div className={classes.dropdown}>
                                    <Link to='/mybusiness' className={classes.navlink}>
                                        Business <i class="fa fa-caret-down"></i>
                                    </Link>

                                    <div className={classes.dropdownContent}>
                                        <Link to = '/mybusiness' className={classes.dropdownLink}>My Business</Link>
                                        <Link to = '/' className={classes.dropdownLink} onClick={logoutBusiness}>Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={classes.mobileWrapper}>
                        <div className={classes.mobileSidebar}>
                            <i onClick={toggleModal} class="fas fa-bars"></i>
                            <Sidebar modal={modal} toggle={toggleModal}/>
                        </div>
                        <div className={classes.mobileLogo}>
                            {!modal ? <p className={classes.mobileLogoContent}><i class="far fa-clock"></i>n Your Terms</p> : null}
                        </div>
                    </div>

                    
                </div>
            )
        }
    }
    else {
        displayContent = (
            <div className={classes.navbar}>

                <div className={classes.logo}>
                    <Link to='/' className={classes.desktop}>
                        <img src={logo} alt="On Your Terms" className={classes.img}/>
                    </Link>
                </div>

                
                <div className={classes.linksDiv}>
                    <ul className={classes.linksList}>
                        <li className={classes.link}>
                            <Link to='/' className={classes.navlink}>
                                <i class="fas fa-home"></i> Home
                            </Link>
                        </li>

                        <li className={classes.navitem}>
                            <Link to='/business' className={classes.navlink}>
                                OYT Business
                            </Link>
                        </li>

                        <li className={classes.navitem}>
                            <div className={classes.dropdown}>
                                <Link className={classes.navlink}>
                                    <button className={classes.joinBtn}>Sign Up <i class="fa fa-caret-down"></i></button>
                                </Link>

                                <div className={classes.dropdownContent}>
                                    <Link onClick={()=>{setOption(true); toggleUserModal();}} className={classes.dropdownLink}>Sign Up</Link>
                                    <Link onClick={()=>{setOption(false); toggleUserModal();}} className={classes.dropdownLink}>Login</Link>
                                    <Link onClick={()=>{setOption(true); toggleBusinessModal();}} className={classes.dropdownLink}>Business Signup</Link>
                                    <Link onClick={()=>{setOption(false); toggleBusinessModal();}} className={classes.dropdownLink}>Business Login</Link>
                                </div>
                                <AccountModal modal={userModal} toggle={toggleUserModal} setModal={setUserModal}/>
                                <BusinessAccountModal modal={businessModal} toggle={toggleBusinessModal} setModal={setBusinessModal} option={option}/>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={classes.searchWrapper}>
                    <form onSubmit={handleSearch}className={classes.searchbox}>
                        <input type="text" placeholder="Search..." onChange={(e) => {setSearch(e.target.value)}}/>
                        <Link to={{pathname:'/search', searchProps:{search:jobs}}}>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </Link>
                    </form>
                </div>

                <div className={classes.mobileWrapper}>
                    <div className={classes.mobileSidebar}>
                        <i onClick={toggleModal} class="fas fa-bars"></i>
                        <Sidebar modal={modal} toggle={toggleModal}/>
                    </div>
                    <div className={classes.mobileLogo}>
                        {!modal ? <p className={classes.mobileLogoContent}><i class="far fa-clock"></i>n Your Terms</p> : null}
                    </div>
                </div>
            </div>
        )
    }

    return displayContent
}

export default NavigationBar;