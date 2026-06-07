import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Menu        from './components/Menu'
import Testimonials from './components/Testimonials'
import Gallery     from './components/Gallery'
import Contact     from './components/Contact'


export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}
