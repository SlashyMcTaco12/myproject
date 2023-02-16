import { FunctionComponent, useEffect, useState } from "react";

interface HomeProps {
    isLoggedIn: boolean
}

const Home: FunctionComponent<HomeProps> = ({ isLoggedIn }) => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1400px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 1400px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    return <>
        <div className="container text-center" style={{ marginTop: -20 }}>
            <h1 className="text-center text-light" style={{ fontFamily: 'timesNewRoman' }}>Welcome to Business Exchange!</h1>
            {!isLoggedIn && <h4 className="text-center text-light" style={{ fontFamily: 'timesNewRoman' }}>Go to About to sign up!</h4>}
            {matches && (<img src="/images/handshake.jpg" style={{ width: 'cover' }} />)}
            {!matches && 
            (<>
                <img src="/images/handshake.jpg" style={{ width: '80vw' }} />
                <img src="/images/handshake.jpeg" style={{ width: '80vw', marginTop: '7vh' }} />
            </>)}
        </div>
    </>
}

export default Home;