import React from 'react'
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
import './MyFooter.css'


const MyFooter = () => {
    return (
        <div className='myFooter'>
            <Box>
                {/* <h1 style={{
                    color: "green",
                    textAlign: "center",
                    marginTop: "-50px"
                }}>
                    GeeksforGeeks: A Computer Science Portal for Geeks
                </h1> */}
                <Container>
                    <Row>
                        <Column>
                            <Heading>Hotel Facilities</Heading>
                            <FooterLink href="#">Computer facility</FooterLink>
                            <FooterLink href="#">Conference and meeting facilities</FooterLink>
                            <FooterLink href="#">Non-smoking rooms</FooterLink>
                        </Column>
                        <Column>
                            <Heading>Services</Heading>
                            <FooterLink href="#">Car rental services</FooterLink>
                            <FooterLink href="#">Catering services</FooterLink>
                            <FooterLink href="#">Doctor on call</FooterLink>
                            <FooterLink href="#">Dry cleaning</FooterLink>
                        </Column>
                        <Column>
                            <Heading>Contact Us</Heading>
                            <FooterLink href="#">Toll-Free Room Reservation Numbers</FooterLink>
                            <FooterLink href="#">
                            107 Kazi Nazrul Islam Avenue, Dhaka 1215, Bangladesh</FooterLink>
                            
                            
                        </Column>
                        <Column>
                            <Heading>Social Media</Heading>
                            <FooterLink href="#">
                                <i className="fab fa-facebook-f">
                                    <span style={{ marginLeft: "10px" }}>
                                        Facebook
                                    </span>
                                </i>
                            </FooterLink>
                            <FooterLink href="#">
                                <i className="fab fa-instagram">
                                    <span style={{ marginLeft: "10px" }}>
                                        Instagram
                                    </span>
                                </i>
                            </FooterLink>
                            <FooterLink href="#">
                                <i className="fab fa-twitter">
                                    <span style={{ marginLeft: "10px" }}>
                                        Twitter
                                    </span>
                                </i>
                            </FooterLink>
                            <FooterLink href="#">
                                <i className="fab fa-youtube">
                                    <span style={{ marginLeft: "10px" }}>
                                        Youtube
                                    </span>
                                </i>
                            </FooterLink>
                        </Column>
                    </Row>
                </Container>
            </Box>
        </div>
    )
}

export default MyFooter
