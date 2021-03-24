import React, { useState, useEffect } from 'react';

import background from '../../../../../assets/images/computer-background.jpg';
import AccountModal from '../../modals/account/accountModal';

import classes from './home.css';



const Home = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    return (
        <div className={classes.homeWrapper}>
            <div className={classes.imageWrapper}>
                <img src={background} className={classes.backgroundImage} />
                <div className={classes['img-txt']}>On Your Time <br/>On Your Rate <br/>On Your Terms</div>
                <div className={classes["img-signup"]}>
                    {!JSON.parse(localStorage.getItem('profile')) ? (<button type="submit" className={classes['signup-button']} onClick={toggleModal}>Sign Up Today</button>) : null}
                    <AccountModal modal={modal} toggle={toggleModal} setModal={setModal} option={true}/>
                </div>
            </div>
            <div className={classes["content-wrapper"]}>
                
                <div className={classes["info-1"]}>
                    <div className={classes["job-search"]}>
                        <h1 className={classes["job-heading"]}>Freelancers</h1>
                        <p className={classes["text-info"]}><i class="fas fa-clock"></i> Search for jobs which work on your terms</p>
                        <p className={classes["text-info"]}><i class="fas fa-robot"></i> Allow our system to do the job search for you</p>
                        <p className={classes["text-info"]}><i class="fas fa-smile"></i> Reep the benefits of the easiest job search ever</p>
                    </div>
                    <div className={classes["job-search"]}>
                        <h1 className={classes["job-heading"]}>Employers</h1>
                        <p className={classes["text-info"]}><i class="fas fa-share"></i> Share job vacancies on our site</p>
                        <p className={classes["text-info"]}><i class="fas fa-robot"></i> Allow our system to send your roles to suited freelancers</p>
                        <p className={classes["text-info"]}><i class="fas fa-smile"></i> Reep the benefits of the easiest job recruitment ever</p>
                    </div>
                </div>


                <div className={classes["info-2"]}>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-laptop-code"></i>
                        <p className={classes["text-info"]}>Web Development</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-palette"></i>
                        <p className={classes["text-info"]}>Graphic Design</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-camera"></i>
                        <p className={classes["text-info"]}>Photography</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-language"></i>
                        <p className={classes["text-info"]}>Translator</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-mobile"></i>
                        <p className={classes["text-info"]}>App Development</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-pen"></i>
                        <p className={classes["text-info"]}>Copywriter</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-database"></i>
                        <p className={classes["text-info"]}>Data Entry</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-graduation-cap"></i>
                        <p className={classes["text-info"]}>Tutoring</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fab fa-hire-a-helper"></i>
                        <p className={classes["text-info"]}>Personal Assistant</p>
                    </div>
                    <div className={classes["job-types"]}>
                        <i class="fas fa-paint-brush"></i>
                        <p className={classes["text-info"]}>Painter</p>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default Home;