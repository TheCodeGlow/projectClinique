import React from "react";
import "../pages/styles/home.css";
function Footer() {
    return (
        <footer class="footer">
            <div class="footer__blueRectangle">
                <div class="footer__description">
                    <div class="logo footer__logo">
                        <div class="letterT footer__letterT">H</div>
                        <div class="logoName footer__trafalgar"> HealthHub </div>
                    </div>
                    <div class="footer__descriptionText">
                        HealthHub provides progressive, and affordable<br />
                        healthcare, accessible on mobile and online<br />
                        for everyone
                    </div>
                    <div class="footer__copyright">
                        HealthHub PTY LTD 2023. All rights reserved
                    </div>
                </div>
                <div class="footer__company">
                    <h1 class="footer__title">Company</h1>
                    <div class="footer__links">
                        <a href="#">About</a>
                        <a href="#">Testimonials</a>
                        <a href="#">Find a doctor</a>
                        <a href="#">Apps</a>
                    </div>
                </div>
                <div class="footer__region">
                    <div class="footer__region">
                        <h1 class="footer__title">Region</h1>
                        <div class="footer__links">
                            <a href="#">Indonesia</a>
                            <a href="#">Singapore</a>
                            <a href="#">Hong Kong</a>
                            <a href="#">Canada</a>
                        </div>
                    </div>
                </div>
                <div class="footer__help">
                    <h1 class="footer__title">Help</h1>
                    <div class="footer__links">
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