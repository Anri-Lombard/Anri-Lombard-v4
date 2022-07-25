import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupProfile = (topic: any, details: any) => {
    return (
        <Popup trigger={<button className="button box">{topic}</button>} modal>
            <span>{details}</span>
        </Popup>
    )
}

export default PopupProfile;