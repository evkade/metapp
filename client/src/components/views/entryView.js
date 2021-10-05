import React from 'react'; 
import { useState } from 'react';
import '../components.css';
import mkmlogo from '../images/mkm_logo.png'
import dkmlogo from '../images/dkm_logo.png'

const EntryView = () => {
    return (
        <div className="entryView">
            <div className="entryView__logos">
                <img src={mkmlogo}/>
                <img src={dkmlogo}/>
            </div>
            <p className="entryView__neonText">
                METAPP
            </p> 
            <div>
                <button className="entryView__buttons entryView__buttons--yellow">
                    log in
                </button>
                <button className="entryView__buttons entryView__buttons--green">
                    sign up
                </button>
            </div>
        </div>
    );
}

export default EntryView;