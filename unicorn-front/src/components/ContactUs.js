import React from 'react'
import '../css/ContactUs.css'
//import { LocalPhone, LocationOn} from '@mui/icons-material';
import Email from '@mui/icons-material/Email';
import LocalPhone from '@mui/icons-material/LocalPhone';
import LocationOn from '@mui/icons-material/LocationOn';
function ContactUs() {
    return (
        <div className="contactUs">
            <div className="contactUs__header">
               <h1> Contact Us</h1>
               <p> If you are a host trying to register your pitch or if you are a member with any 
                   questions, contact us using the contact information below.
               </p>
            </div>
            <div className="contactUs__content">
                <div className="contactUs__content__address">
                    <LocationOn className="contactUs__content__address__icon"/>
                    <div className="contactUs__content__address__details">
                       <h3> Address </h3>
                       <p> Next to Moenco, Bole Addis Ababa</p>
                    </div>
                </div>
                <div className="contactUs__content__phone">
                    <LocalPhone className="contactUs__content__phone__icon"/>
                    <div className="contactUs__content__phone__details">
                       <h3> Phone </h3>
                       <p> +251944054608</p>
                    </div>
                </div>
                <div className="contactUs__content__email">
                     <Email className="contactUs__content__email__icon"/>
                    <div className="contactUs__content__email__details">
                       <h3> Email </h3>
                       <p> mekuamicki@gmail.com</p>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default ContactUs
