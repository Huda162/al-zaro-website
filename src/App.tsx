import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../public/assets/sass/bootstrap.scss'
import '../public/assets/css/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Routers from './Routers';
import { useEffect } from 'react';
import i18n from 'i18next';
import './i18n/index'
import ScrollToTop from './components/ScrollToTop';
import Socials from './components/Socials';

function App() {
  useEffect(() => {
    if (i18n.language == 'ar') {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    }
    else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }, [i18n.language])
  return (
    <>
      <ScrollToTop />
      <div className='site-nav'>
        <Socials />
      </div>
      <Routers />
    </>
  )
}

export default App
