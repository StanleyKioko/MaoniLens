import React from 'react';
import { TRANSLATIONS } from '../utils/constants';

const Footer = ({ language }) => {
  const translations = TRANSLATIONS[language];
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: language === 'sw' ? 'Kuhusu' : 'About',
      links: [
        { name: language === 'sw' ? 'Kuhusu MaoniBot' : 'About MaoniBot', href: '#about' },
        { name: language === 'sw' ? 'Jinsi Inavyofanya Kazi' : 'How It Works', href: '#how-it-works' },
        { name: language === 'sw' ? 'Takwimu' : 'Statistics', href: '#statistics' },
        { name: language === 'sw' ? 'Kumbuka Habari' : 'News & Updates', href: '#news' }
      ]
    },
    {
      title: language === 'sw' ? 'Data na Faragha' : 'Data & Privacy',
      links: [
        { name: language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy', href: '#privacy' },
        { name: language === 'sw' ? 'Masharti ya Matumizi' : 'Terms of Use', href: '#terms' },
        { name: language === 'sw' ? 'Vyanzo vya Data' : 'Data Sources', href: '#data-sources' },
        { name: language === 'sw' ? 'Ufuta Data' : 'Data Deletion', href: '#data-deletion' }
      ]
    },
    {
      title: language === 'sw' ? 'Msaada' : 'Support',
      links: [
        { name: language === 'sw' ? 'Maswali Yanayoulizwa Mara Kwa Mara' : 'FAQ', href: '#faq' },
        { name: language === 'sw' ? 'Wasiliana Nasi' : 'Contact Us', href: '#contact' },
        { name: language === 'sw' ? 'Ripoti Tatizo' : 'Report Issue', href: '#report' },
        { name: language === 'sw' ? 'Mafunzo' : 'Tutorial', href: '#tutorial' }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      href: 'https://twitter.com/maonibot',
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: '💻',
      href: 'https://github.com/maonibot',
      color: 'hover:text-gray-600'
    },
    {
      name: 'Email',
      icon: '📧',
      href: 'mailto:info@maonibot.co.ke',
      color: 'hover:text-green-500'
    },
    {
      name: 'WhatsApp',
      icon: '📱',
      href: 'https://wa.me/254700000000',
      color: 'hover:text-green-600'
    }
  ];

  return (
    <footer className="kenya-black text-white mt-8">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/40x40?text=M&color=FFFFFF&background=008000" 
                alt="MaoniBot Logo" 
                className="w-10 h-10 mr-3 rounded-full"
              />
              <h3 className="text-xl font-bold">{translations.title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {language === 'sw' 
                ? 'MaoniBot ni jukwaa la uchambuzi wa hisia za umma wa Kenya kutoka mitandao ya kijamii.'
                : 'MaoniBot is a platform for analyzing Kenyan public sentiment from social media conversations.'
              }
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${social.color} transition-colors duration-200 text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-kenya-green">1.2K+</div>
              <div className="text-sm text-gray-400">
                {language === 'sw' ? 'Machapisho Yamechambuliwa' : 'Posts Analyzed'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-kenya-green">45+</div>
              <div className="text-sm text-gray-400">
                {language === 'sw' ? 'Hashtag za Mwenendo' : 'Trending Hashtags'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-kenya-green">47</div>
              <div className="text-sm text-gray-400">
                {language === 'sw' ? 'Kaunti' : 'Counties'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-kenya-green">99.9%</div>
              <div className="text-sm text-gray-400">
                {language === 'sw' ? 'Upatikanaji' : 'Uptime'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              <span>© {currentYear} MaoniBot. </span>
              <span>
                {language === 'sw' 
                  ? 'Haki zote zimehifadhiwa.'
                  : 'All rights reserved.'
                }
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>
                {language === 'sw' ? 'Imetengenezwa na' : 'Powered by'}
              </span>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://via.placeholder.com/16x16?text=xAI&color=FFFFFF&background=000000" 
                  alt="xAI" 
                  className="w-4 h-4"
                />
                <span className="font-medium">xAI</span>
              </div>
              <span>|</span>
              <span>
                {language === 'sw' ? 'Vyanzo vya data' : 'Data sourced from'}: Twitter/X
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;