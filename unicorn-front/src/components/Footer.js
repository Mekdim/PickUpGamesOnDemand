import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'

import TwitterIcon from '@mui/icons-material/Twitter'
function Footer(){

    return (
    
     <div className='footer-container'>
        
        <div className='footer__top__links'>
          <div className='footer__top__links__items'>
            <h2>About Us</h2>
            <Link to='/aboutus'> About us </Link>
            <Link to='/'>How it works</Link>
            <Link to='/contactus'>Contact us</Link>
            <Link to='/contactus'>Host Games</Link>
            <Link to='/terms'>Terms of Service</Link>
          </div>
          
          <div className='footer__top__links__items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      
    
       <div className="footer__bottom">
           <div className="footer__bottom__terms">
               <Link to='/' style={{"text-decoration":"none"}}><p className="footer__bottom__terms__labels"> Kuas Inc  </p></Link>
               <Link to='/terms' style={{"text-decoration":"none"}}><p className="footer__bottom__terms__labels"> Terms  </p></Link>
               <Link to='/privacy' style={{"text-decoration":"none"}}><p className="footer__bottom__terms__labels"> Privacy  </p></Link>
           </div> 
           <div className="footer__bottom__socialIcons">
               <a href={'https://www.facebook.com/mekuaa/'} target="_blank" style={{"text-decoration":"none"}}> <FacebookIcon style={{color: "white", "margin-right":"20px"}}/> </a>
               <Link to='/' style={{"text-decoration":"none"}}> <InstagramIcon style={{color: "white", "margin-right":"20px"}}/> </Link>
               <Link to='/' style={{"text-decoration":"none"}}><TwitterIcon style={{color: "white", "margin-right":"20px"}}/> </Link>
               <Link to='/' style={{"text-decoration":"none"}}><LinkedInIcon style={{color: "white", "margin-right":"20px"}}/></Link>
               <Link to='/' style={{"text-decoration":"none"}}><YouTubeIcon style={{color: "white", "margin-right":"20px"}}/></Link>
            </div>
       </div>
    </div>
    

    )
}
export default Footer
