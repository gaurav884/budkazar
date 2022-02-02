import React from 'react'
import {Link} from "react-router-dom"
import "./Footer.css"

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="footer-outer">
            <div className="footer-container">


                <div className="footer-container-1">
                    <div className="address-container">
                        <p className="footer-headings">Address</p>
                        <p className="address" >House no. 209 ward 4</p>
                    </div>


                    <div className="social-container">
                        <p className="footer-headings" >Social Media </p>
                        <ul className="footer-social-links">
                            
                            <a  href="https://www.instagram.com/sem/campaign/emailsignup/?campaign_id=13530338610&extra_1=s|c|528180820730|e|instagram%20%27|&placement=&creative=528180820730&keyword=instagram%20%27&partner_id=googlesem&extra_2=campaignid%3D13530338610%26adgroupid%3D123868089099%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1321618851291%26loc_physical_ms%3D9297884%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAjwp_GJBhBmEiwALWBQk_K1_QP10wL_oQ2igqOh431LEj24sra1WIH-_zmkmUhRN65APD4atRoCfHwQAvD_BwE" target="_blank">
                            <li className="footer-social-links">
                            Instagram
                            </li>
                            </a>
                            
                            <a href="https://twitter.com/Gaurav28692722" target="_blank">
                            <li className="footer-social-links">Twitter</li>
                            </a>   

                            <a href="https://www.facebook.com/profile.php?id=100035651117027" target="_blank"> 
                            <li className="footer-social-links">Facebook</li>
                            </a>
                        </ul>
                    </div>


                    <div className="contact-container">
                        <p className="footer-headings" >Contact</p>
                        <p className="contact-info">Email ID: tgaurav053@gmail.com</p>
                        <p className="contact-info">Mobile : 78786037884</p>
                    </div>

                </div>
                <div className="footer-container-2">
                    <p>© Copyright Budkazar {year} </p>
                </div>
            </div>

        </div>
    )
}

export default Footer
