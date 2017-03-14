import React from 'react'

function Footer() {
  return (
     <div className="row footer center">
        <div className="section">
           <div className="logo"><img src="/assets/images/logo-inverted.png" alt="Logo inverted e3e1299a5da3b55f484611d3b06c397406919f9ccce7886349331d73b6a81b31" /></div>
           <hr className="quarter" />
           <ul>
              <li><a href="https://www.doximity.com/developers/home">Doximity API</a></li>
              <li className="line">|</li>
              <li><a href="https://github.com/doximity">Open Source</a></li>
              <li className="lime">|</li>
              <li><a href="https://twitter.com/dox_engineering">Follow Us</a></li>
           </ul>
           <hr className="quarter" />
           <p>&copy; 2017</p>
        </div>
     </div>
  )
}

export default Footer;
