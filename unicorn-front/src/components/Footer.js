import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import TwitterIcon from '@mui/icons-material/Twitter';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('main');

  return (
    <div className="footer-container">
      <div className="footer__top__links">
        <div className="footer__top__links__items">
          <h2>{t('footer.title')}</h2>
          <Link to="/aboutus">{t('footer.aboutUs')}</Link>
          <Link to="/">{t('footer.howItWorks')}</Link>
          <Link to="/contactus">{t('footer.contactUs')}</Link>
          <Link to="/contactus">{t('footer.host')}</Link>
          <Link to="/terms">{t('footer.terms')}</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom__terms">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className="footer__bottom__terms__labels"> Kuas Inc </p>
          </Link>
          <Link to="/terms" style={{ textDecoration: 'none' }}>
            <p className="footer__bottom__terms__labels">{t('footer.terms')}</p>
          </Link>
          <Link to="/privacy" style={{ textDecoration: 'none' }}>
            <p className="footer__bottom__terms__labels">
              {t('footer.privacy')}
            </p>
          </Link>
        </div>
        <div className="footer__bottom__socialIcons">
          <a
            href={'https://www.facebook.com/groups/kuaas'}
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon style={{ color: 'white', marginRight: '20px' }} />
          </a>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <InstagramIcon style={{ color: 'white', marginRight: '20px' }} />
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <TwitterIcon style={{ color: 'white', marginRight: '20px' }} />{' '}
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <LinkedInIcon style={{ color: 'white', marginRight: '20px' }} />
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <YouTubeIcon style={{ color: 'white', marginRight: '20px' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Footer;
