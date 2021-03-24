import React, { useState } from 'react';

import classes from './oytBusiness.css';

import img from '../../../../../assets/images/photographer-background.jpg';
import BusinessAccountModal from '../../modals/businessAccount/businessAccountModal';

const OYTBusiness = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    return(
        <div className={classes["business-wrapper"]}>
            <div className={classes["image-wrapper"]}>
                <img src={img} className={classes["background-img"]}/>
                <h1 className={classes["img-text"]}>
                    On Your Terms
                </h1>
                <h1 className={classes["img-text-2"]}>
                    Business
                </h1>

                <p className={classes["img-text-3"]}>
                    Upload new vacancies <br/>
                    Allow our talented pool of users to find your jobs <br />
                    Embrace the simplicity of OYT Business
                </p>

                <button className={classes["join-btn"]} onClick={toggleModal}>
                    Join Today
                </button>
                <BusinessAccountModal modal={modal} toggle={toggleModal} setModal={setModal} option={true}/>
            </div>
        </div>
    )
}

export default OYTBusiness;