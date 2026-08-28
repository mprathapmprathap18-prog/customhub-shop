import WorkIcon from '@mui/icons-material/Work';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import logo from '../../../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const footerLinks = [
  {
    title: "about",
    links: [
      { name: "Contact Us", redirect: "#" },
      { name: "About Us", redirect: "#" },
      { name: "Gift Guide", redirect: "/products" },
    ]
  },
  {
    title: "help",
    links: [
      { name: "Payments", redirect: "#" },
      { name: "Shipping", redirect: "#" },
      { name: "Cancellation & Returns", redirect: "#" },
      { name: "FAQ", redirect: "#" },
    ]
  },
  {
    title: "policy",
    links: [
      { name: "Return Policy", redirect: "#" },
      { name: "Terms Of Use", redirect: "#" },
      { name: "Privacy", redirect: "#" },
    ]
  },
  {
    title: "social",
    links: [
      { name: "Facebook", redirect: "#" },
      { name: "Instagram", redirect: "#" },
      { name: "YouTube", redirect: "#" },
    ]
  }
]

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-500 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">

              {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-yellow-400 mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, j) => (
                    <a href={item.redirect} className="hover:underline" key={j}>{item.name}</a>
                  ))}
                </div>
              ))}

            </div>

            <div className="border-gray-500 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="text-yellow-400">Mail Us:</h2>
                <p className="mt-2 leading-5">Custom Hub Gift Shop,<br />
                  Sri Balaji Complex, New Pet,<br />
                  Krishnagiri, 635001,<br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="w-full sm:w-1/2">
                <h2 className="text-yellow-400">Registered Office Address:</h2>
                <p className="mt-2 leading-5">Custom Hub Gift Shop,<br />
                  Sri Balaji Complex, New Pet,<br />
                  Krishnagiri, 635001,<br />
                  Tamil Nadu, India <br />
                  Telephone: <a className="text-yellow-400" href="tel:+917550079573">+91 7550079573</a><br />
                  <a className="text-yellow-400 hover:underline inline-block mt-1" href="https://maps.app.goo.gl/gjxPqjsHes6Zy7No9?g_st=ic" target="_blank" rel="noreferrer">📍 View on Google Maps</a>
                </p>
              </div>
            </div>

          </footer>

          <div className="px-16 py-6 w-full bg-gray-700 hidden sm:flex justify-between items-center text-sm text-white">
            <a href="/products" className="flex items-center gap-2">
              <span className="text-yellow-400"><CardGiftcardIcon sx={{ fontSize: "20px" }} /></span> Shop Gifts
            </a>
            <a href="#" className="flex items-center gap-2">
              <span className="text-yellow-400"><WorkIcon sx={{ fontSize: "20px" }} /></span> Custom Orders
            </a>
            <a href="#" className="flex items-center gap-2">
              <span className="text-yellow-400"><HelpIcon sx={{ fontSize: "20px" }} /></span> Help Center
            </a>

            <div className="flex items-center gap-2">
              <img src={logo} alt="Custom Hub" className="h-6 w-6 rounded-full bg-white p-0.5 object-contain" />
              <span>&copy; {new Date().getFullYear()} Custom Hub Sublimation Shop</span>
            </div>
            <img draggable="false" src={paymentMethods} alt="Card Payment" />
          </div>
        </>
      )}
    </>
  )
};

export default Footer;
