import PopupProfile from '../components/popupProfile';

function Learning() {
    const learning = {
        "university": [
            {"MAM1000W": "This was cool"},
            {"MAM2000W": "This is still cool"},
            {"STA1006S": "This was kinda nice"}
        ]
    }
    

    return (
        <div className="min-h-screen flex flex-col mx-10">
            <div className="page-intro">
                Learning
            </div>
            <h3 className="heading">University</h3>
            <div className="box-container">
                <div className="box flipper"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            
            <h3 className="heading">Outside University</h3>
            <div className="box-container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
        </div>
    )
}

export default Learning;