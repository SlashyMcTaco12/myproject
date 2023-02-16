import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return <>
        <div className="container text-center" style={{ marginTop: -20, backgroundImage: `url("/images/busCards.jpg")`, backgroundSize: 'cover', paddingBottom: '40vh' }}>
            <div className="pb-4"></div>
            <div className="container col-md-8 pb-4" style={{ backgroundColor: 'rgba(0,0,0,0.6' }}>
                <h1 className="text-light" style={{ fontFamily: 'timesNewRoman' }}>About Us</h1>
                <h2 className="text-light" style={{ fontFamily: 'timesNewRoman' }}>
                    {<br/>}
                    Business Exchange&#8482;
                    {<br/>}
                </h2>
                <h3 className="text-light" style={{ fontFamily: 'timesNewRoman' }}>
                Our website allows various businesses world-wide to interact with other like-minded organizations by creating their own digital business cards, available for all active users to browse through.
                {<br/>}
                {<br/>}
                Join our rich community filled with brilliant business makers and spread the name of your very own business by registering using the link below!
                </h3>
            </div>
            <button className="btn btn-success mt-4"><Link className="nav-link fs-4" to={"/signform"}>Sign In \ Sign Up</Link></button>
        </div>
    </>
}

export default About;