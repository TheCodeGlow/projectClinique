import React from 'react';

import '../styles/home.css';


function Homepage() {
    return (
        <div className="mainWrapper">
            <section className="virtualHealthcare">
                <div className="virtualHealthcareInfo__info">
                    <div className="virtualHealthcareInfo__info-title">
                        Virtual healthcare
                        <br />
                        for you
                    </div>
                    <div className="virtualHealthcareInfo__info-description">
                        Trafalgar provides progressive, and affordable<br />
                        healthcare, accessible on mobile and online<br />
                        for everyone
                    </div>
                    <button className="virtualHealthcareInfo__info-button">Consult today</button>
                </div>
                <img className="virtualHealthcare__Illustration"
                    src="images/png/trafalgar-illustration-sec01.png"
                    alt="trafalgar-illustration-sec01" />
            </section>
            <section className="ourServices">
                <h1 className="ourServices__title">
                    Our services
                </h1>
                <div className="line ourServices__line"></div>
                <div className="ourServices__description">
                    We provide to you the best choices for you. Adjust it to your health needs and make sure your undergo
                    treatment<br />
                    with our highly qualified doctors you can consult with us which type of service is suitable for your health
                </div>
                <div className="ourServices__services">
                    <div className="service">
                        <img src="images/svg/search-doctor.svg" alt="search-doctor" />
                        <h2 className="service__title">
                            Search doctor
                        </h2>
                        <div className="service__description">
                            Choose your doctor from thousands<br />
                            of specialist, general, and trusted<br />
                            hospitals
                        </div>
                    </div>
                    <div className="service">
                        <img src="images/svg/online-pharmacy.svg" alt="online-pharmacy" />
                        <h2 className="service__title">
                            Online pharmacy
                        </h2>
                        <div className="service__description">
                            Buy your medicines with our mobile<br />
                            application with a simple delivery<br />
                            system
                        </div>
                    </div>
                    <div className="service">
                        <img src="images/svg/consultation.svg" alt="consultation" />
                        <h2 className="service__title">
                            Consultation
                        </h2>
                        <div className="service__description">
                            Free consultation with our trusted<br />
                            doctors and get the best<br />
                            recommendations
                        </div>
                    </div>
                    <div className="service">
                        <img src="images/svg/details-info.svg" alt="details-info" />
                        <h2 className="service__title">
                            Details info
                        </h2>
                        <div className="service__description">
                            Free consultation with our trusted<br />
                            doctors and get the best<br />
                            recommendations
                        </div>
                    </div>
                    <div className="service">
                        <img src="images/svg/emergency-care.svg" alt="emergency-care" />
                        <h2 className="service__title">
                            Emergency care
                        </h2>
                        <div className="service__description">
                            You can get 24/7 urgent care for<br />
                            yourself or your children and your<br />
                            lovely family
                        </div>
                    </div>
                    <div className="service">
                        <img src="images/svg/tracking.svg" alt="tracking" />
                        <h2 className="service__title">
                            Tracking
                        </h2>
                        <div className="service__description">
                            Track and save your medical history<br />
                            and health data
                        </div>
                    </div>
                </div>
                <button className="btnSecondary ourServices__button">Learn more</button>
            </section>
            <section className="app">
                <div className="app__info">
                    <h1 className="app__info-title">
                        Welcome To<br />
                        Our web portal
                    </h1>
                    <div className="line"></div>
                    <div className="app__info-description">
                        Our dedicated patient engagement web portal<br />
                        allow you to access information<br />
                        instantaneously (no tedious form, long calls,<br />
                        or administrative hassle) and securely
                    </div>
                </div>

                <img className="app__illustration"
                    src="images/png/trafalgar-illustration-sec03.png"
                    alt="trafalgar-illustration-sec03" />
            </section>
        </div>
    );
}

export default Homepage;
