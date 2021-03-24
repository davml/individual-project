import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './business.css';

const Business = (props) => {
    let business = useSelector((state) => state?.businessUser);
    if(props?.modal){
        return ReactDom.createPortal(
            <>
                <div className={classes["modal-background"]} onClick={props.toggle} />

                <div className={classes["modal"]}>
                    <div className={classes["business-info"]}>
                        <p>Business Name: {business?.information?.businessName}</p>
                        <p>Business Bio: {business?.information?.businessBio}</p>
                        <p>Business Type: {business?.information?.businessType}</p>
                        <p>Contact Email: {business?.email}</p>
                    </div>
                    <div className={classes["business-img"]}>
                        <img src={business?.information?.selectedFile} />
                    </div>
                </div>
            </>,
            document.getElementById('portal')
        )
    }
    else {
        return null;
    }
}

export default Business;