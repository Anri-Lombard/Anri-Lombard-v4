import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Learning() {
    const learning = {
        "university": [
            {"MAM1000W": "This was cool"},
            {"MAM2000W": "This is still cool"},
        ]
    }
    const popup = (topic: any, details: any) => {
        return (
            <Popup trigger={<button className="button box">{topic}</button>} modal>
                <span>{details}</span>
            </Popup>
        )
    }

    return (
        <div className="min-h-screen flex flex-col mx-10">
            <div className="page-intro">
                Learning
            </div>
            <h3 className="heading">University</h3>
            <div className="box-container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            {/* <div>
                <span>Courses</span>
            </div> */}
            <h3 className="heading">Outside University</h3>
            <div className="box-container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            {/* <div>
                Make popups with brief descriptions of everything
            </div> */}
        </div>
    )
}

export default Learning;