import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return <>
        <footer className="align-items-center py-3 border-top border-success bg-dark" style={{width: '100vw', height: '5vh'}}>
            <p className=" mb-0 text-muted text-center">© 2023 Idan Zaguri</p>
        </footer>
    </>
}

export default Footer;