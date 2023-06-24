import React from "react";
import "../../pages/styles/home.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer__blueRectangle">
                <div className="footer__description">
                    <div className="logo footer__logo">
                        <div className="letterT footer__letterT">H</div>
                        <div className="logoName footer__trafalgar"> HealthHub </div>
                    </div>
                    <div className="footer__descriptionText">
                        HealthHub provides progressive, and affordable<br />
                        healthcare, accessible on mobile and online<br />
                        for everyone
                    </div>
                    <div className="footer__copyright">
                        HealthHub PTY LTD 2023. All rights reserved
                    </div>
                </div>
                <div className="footer__company">
                    <h1 className="footer__title">Company</h1>
                    <div className="footer__links">
                        <a href="#">About</a>
                        <a href="#">Testimonials</a>
                        <a href="#">Find a doctor</a>
                        <a href="#">Apps</a>
                    </div>
                </div>
                <div className="footer__region">
                    <div className="footer__region">
                        <h1 className="footer__title">Region</h1>
                        <div className="footer__links">
                            <a href="#">Indonesia</a>
                            <a href="#">Singapore</a>
                            <a href="#">Hong Kong</a>
                            <a href="#">Canada</a>
                        </div>
                    </div>
                </div>
                <div className="footer__help">
                    <h1 className="footer__title">Help</h1>
                    <div className="footer__links">
                        <a href="#">Help center</a>
                        <a href="#">Contact support</a>
                        <a href="#">Instructions</a>
                        <a href="#">How it works</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;