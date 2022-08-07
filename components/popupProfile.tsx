import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


interface IPopupProfile {
    topic: string,
    details: string,
    usefulness: number
}

const PopupProfile = ({ topic, usefulness, details }: IPopupProfile) => {
    return (
        <Popup trigger={<button className="button box">{topic}</button>} modal nested>
            <div className="modal">       
                <div className="header">{topic}</div> 
                <div className="content">
                    {usefulness}      
                </div>        
                <div className="actions">          
                    {details}     
                </div>
            </div>
        </Popup>
    )
}

export default PopupProfile;