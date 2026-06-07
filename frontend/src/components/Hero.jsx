import '../styles/Hero.css'
import coffeeHero from "../assets/images/coffee-hero-section.png";

export default function Hero() {
  
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      
      <div className="hero__content">
        
        <span className="hero__tagline">Best Coffee</span>

        <h1 className="hero__title">
          Make your day great with our special coffee!
        </h1>

        <p className="hero__description">
          Welcome to our coffee paradise, where every bean tells a story
          and every cup sparks joy.
        </p>

        <div className="hero__buttons">
        
          <button
            className="btn--primary"
            onClick={() => scrollTo('menu')}
          >
            Order Now
          </button>
          <button
            className="btn--outline"
            onClick={() => scrollTo('contact')}
          >
            Contact Us
          </button>
        </div>
      </div>


      <div className="hero__image-wrapper">
        <img
          src={coffeeHero}
          alt="A cup of coffee with splashing beans"
          className="hero__image"
        />
      </div>
    </section>
  )
}
