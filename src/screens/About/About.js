import React from 'react'
import './About.css'
import hotelVideo from '../../imgs/video.mp4'
import {Link} from 'react-router-dom'
import MyFooter from '../../components/Footer/MyFooter'
import MyCopyright from '../../components/Copyright/MyCopyright'

const About = () => {
    return (
        <div>
            <section class="heading">
                <video autoPlay loop class="video-background" muted plays-inline>
                    <source src={hotelVideo} type="video/mp4" />
                </video>

                <center>
                    <div class="welcome-msg ">
                        <h1> About Sonargaon Hotels </h1>
                        <p>
                        Daily Breakfast & More — Join Pan Pacific DISCOVERY for Maximum Savings, Earn DISCOVERY Dollars and Other Benefits! Escape to a World of Comfort Today and Experience Refined Living with Premium Amenities. Exclusive Member...
                        </p>
                       <Link to="rooms"> <a class="btn btn-book btna"> Book Room </a> </Link>
                       <Link to="/"> <a class="btn btn-home btna"> Return to Home</a></Link>
                    </div>

                </center>
            </section>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default About
