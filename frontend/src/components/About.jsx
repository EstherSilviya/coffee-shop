import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import '../styles/About.css'
import about from "../assets/images/about-image.jpg";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* LEFT: Circular photo */}
        <div className="about__image-wrapper">
          <img
            src={about}
            alt="Two people enjoying coffee at Coffee House"
            className="about__image"  
          />
        </div>

    
        <div className="about__content">
          <h2 className="section-title">ABOUT US</h2>
          
          <div className="section-underline" />

          <p className="about__text">
            At Coffee House in Berndorf, Germany, we pride ourselves on being a
            go-to destination for coffee lovers and conversation seekers alike.
            We&apos;re dedicated to providing an exceptional coffee experience in a
            cozy and inviting atmosphere, where guests can relax, unwind, and
            enjoy their time in comfort.
          </p>

          <div className="about__socials">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
