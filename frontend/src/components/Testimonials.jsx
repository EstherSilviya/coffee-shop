import { useState, useEffect, useCallback } from 'react'
import '../styles/Testimonials.css'
import user1 from "../assets/images/user-1.jpg";
import user2 from "../assets/images/user-2.jpg";
import user3 from "../assets/images/user-3.jpg";
import user4 from "../assets/images/user-4.jpg";
import user5 from "../assets/images/user-5.jpg";


const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: user1,
    quote: '"Loved the French roast. Perfectly balanced and rich. Will order again!"',
  },
  {
    id: 2,
    name: 'James Wilson',
    avatar: user2,
    quote: '"Great espresso blend! Smooth and bold flavor. Fast shipping too!"',
  },
  {
    id: 3,
    name: 'Michael Brown',
    avatar: user3,
    quote: '"Fantastic mocha flavor. Fresh and aromatic. Quick shipping!"',
  },
  {
    id: 4,
    name: 'Emily Harris',
    avatar: user4,
    quote: '"Excellent quality! Fresh beans and quick delivery. Highly recommend."',
  },
  {
    id: 5,
    name: 'Anthony Thompson',
    avatar: user5,
    quote: '"Best decaf I\'ve tried! Smooth and flavorful. Arrived promptly."',
  },
]


const VISIBLE = 3
const TOTAL_PAGES = Math.ceil(TESTIMONIALS.length / VISIBLE)

export default function Testimonials() {
  
  const [currentPage, setCurrentPage] = useState(0)
  const nextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % TOTAL_PAGES)
  }, [])

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES)
  }

  useEffect(() => {
    const timer = setInterval(nextPage, 4000)
    // Cleanup: clear interval on unmount or when nextPage changes
    return () => clearInterval(timer)
  }, [nextPage])

  const trackStyle = {
    transform: `translateX(-${currentPage * 100}%)`,
  }

  return (
    <section className="testimonials" id="testimonials">
      <h2 className="section-title">TESTIMONIALS</h2>
      <div className="section-underline" />

      <div className="testimonials__slider">
      
        <button
          className="testimonials__arrow testimonials__arrow--prev"
          onClick={prevPage}
          aria-label="Previous testimonials"
        >
          &#8249;
        </button>

       
        <div className="testimonials__track-wrapper">
          <div className="testimonials__track" style={trackStyle}>
           
            {Array.from({ length: TOTAL_PAGES }).map((_, pageIdx) => (
              
              <div
                key={pageIdx}
                style={{ display: 'flex', flex: '0 0 100%' }}
              >
                {TESTIMONIALS.slice(
                  pageIdx * VISIBLE,
                  pageIdx * VISIBLE + VISIBLE
                ).map(t => (
                  <div className="testimonials__card" key={t.id}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="testimonials__avatar"
                      loading="lazy"
                    />
                    <p className="testimonials__name">{t.name}</p>
                    <p className="testimonials__quote">{t.quote}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          className="testimonials__arrow testimonials__arrow--next"
          onClick={nextPage}
          aria-label="Next testimonials"
        >
          &#8250;
        </button>
      </div>

      <div className="testimonials__dots">
        {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
          <button
            key={idx}
            className={`testimonials__dot ${currentPage === idx ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx)}
            aria-label={`Go to testimonial page ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
