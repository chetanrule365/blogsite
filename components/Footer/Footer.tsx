import React from "react";

function Footer() {
    return (
        <div className='main-footer'>
            <footer>
                <div className='content'>
                    <div className='left'>
                        <img src='/vercel.svg' alt='' className='logo' />
                        <div className='social'>
                            <img src='/assets/instagram.svg' alt='' />
                            <img src='/assets/linkedin.svg' alt='' />
                            <img src='/assets/gmail.svg' alt='' />
                        </div>
                    </div>
                    <div className='right'>
                        <a
                            href={undefined}
                            target='_blank'
                            rel='noopener noreferrer'>
                            Privacy Policy
                        </a>
                        <a
                            href={undefined}
                            target='_blank'
                            rel='noopener noreferrer'>
                            Terms of Use
                        </a>
                        <a
                            href={undefined}
                            target='_blank'
                            rel='noopener noreferrer'>
                            FAQ
                        </a>
                        <a
                            href={undefined}
                            target='_blank'
                            rel='noopener noreferrer'>
                            Contact
                        </a>
                    </div>
                </div>
                <p>@ Copyright 2021. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;
