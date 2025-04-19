 import React from 'react'
import Footer from './homepages/Footer/Footer'
import Contact from './homepages/Contact/Contact'
import Header from './homepages/Header/Header'
import Navbar from './homepages/Navbar/Navbar'
import Software from './homepages/Software/Software'
import Stats from './homepages/Stats/Stats'
import Successed from './homepages/Successed/Successed'
import Time from './homepages/Time/Time'
 
   
 
 const Homepages = () => {
   return (
     <div style={{overflow:"hidden",}}>
      {/* <Navbar/> */}
           <Header/>
           <Software/>
           <Time/>
           <Stats/>
           <Successed/>
           <Contact/>
           <Footer/>
     </div>
   )
 }
 
 export default Homepages
 