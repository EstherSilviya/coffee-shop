import { useState, useEffect } from 'react'
import '../styles/Gallery.css'
import g1 from "../assets/images/gallery-1.jpg";
import g2 from "../assets/images/gallery-2.jpg";
import g3 from "../assets/images/gallery-3.jpg";
import g4 from "../assets/images/gallery-4.jpg";
import g5 from "../assets/images/gallery-5.jpg";
import g6 from "../assets/images/gallery-6.jpg";

const GALLERY_IMAGES = [
  { id: 1, src: g1, alt: 'Steaming black coffee with beans' },
  { id: 2, src: g2, alt: 'Full English breakfast plate' },
  { id: 3, src: g3, alt: 'Fruit smoothies and shakes' },
  { id: 4, src: g4, alt: 'Breakfast with eggs and coffee' },
  { id: 5, src: g5, alt: 'Dosa with chutneys' },
  { id: 6, src: g6, alt: 'Coffee and croissant combo' },
]

export default function Gallery() {

  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage]) 

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">GALLERY</h2>
      <div className="section-underline" />

      <div className="gallery__grid">
        {GALLERY_IMAGES.map(({ id, src, alt }) => (
          <div
            key={id}
            className="gallery__item"
            onClick={() => setSelectedImage({ src, alt })}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setSelectedImage({ src, alt })}
            aria-label={`View full size: ${alt}`}
          >
            <img src={src} alt={alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="gallery__lightbox"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="gallery__lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            &times;
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
