import React from 'react'; 
import { useState } from 'react';
import './components.css';
import img from './images/brick_wall.jpg';

const EntryView = () => {
    return (
        <div className="entryView">
            <p className="entryView__neonText">
                METAPP
            </p> 
            <div>
                <button>
                    log in
                </button>
                <button>
                    sign up
                </button>
            </div>
        </div>
    );
}

export default EntryView;