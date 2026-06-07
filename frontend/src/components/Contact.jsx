import { useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaGlobe,
} from 'react-icons/fa'
import '../styles/Contact.css'
const API_URL = 'http://localhost:3000/api/contact'

const CONTACT_INFO = [
  { icon: <FaMapMarkerAlt />, text: '123 Campsite Avenue, Wilderness, CA 98765' },
  { icon: <FaEnvelope />,     text: 'info@coffeeshopwebsite.com' },
  { icon: <FaPhone />,        text: '(123) 456-78909' },
  { icon: <FaClock />,        text: 'Monday - Friday: 9:00 AM - 5:00 PM' },
  { icon: <FaClock />,        text: 'Saturday: 10:00 AM - 3:00 PM' },
  { icon: <FaClock />,        text: 'Sunday: Closed' },
  { icon: <FaGlobe />,        text: 'www.codingnepalweb.com' },
]

export default function Contact() {

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const [status, setStatus] = useState('idle') 
  const [feedback, setFeedback] = useState('')  

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback('Please fill in all fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setFeedback('')

    try {
     
      const response = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body:    JSON.stringify(form),                    
      })


      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setFeedback(data.message || '✓ Message sent! We\'ll get back to you soon.')
        setForm({ name: '', email: '', message: '' }) 

        setTimeout(() => {
          setStatus('idle')
          setFeedback('')
        }, 5000)

      } else {
  
        const errorText = Array.isArray(data.errors)
          ? data.errors.join(' ')     
          : data.message || 'Something went wrong.'
        setStatus('error')
        setFeedback(errorText)
      }

    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setFeedback('Could not reach the server. Please try again later.')
    }
  }

  return (
    <>
      <section className="contact" id="contact">
        <h2 className="section-title">CONTACT US</h2>
        <div className="section-underline" />

        <div className="contact__container">
         
          <div className="contact__info">
            {CONTACT_INFO.map(({ icon, text }, idx) => (
              <div className="contact__info-item" key={idx}>
                <span className="contact__info-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>



          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              disabled={status === 'loading'}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              disabled={status === 'loading'}
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              disabled={status === 'loading'}
              required
            />

           
            <button
              type="submit"
              className={`contact__submit contact__submit--${status}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent! ✓' : 'Submit'}
            </button>

            
            {feedback && (
              <p className={`contact__feedback contact__feedback--${status}`}>
                {feedback}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="footer">
        <p className="footer__copy">© 2024 Coffee Shop</p>
        <div className="footer__socials">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="X (Twitter)"><FaXTwitter /></a>
        </div>
        <div className="footer__policies">
          <a href="#">Privacy policy</a>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
          <a href="#">Refund policy</a>
        </div>
      </footer>
    </>
  )
}
