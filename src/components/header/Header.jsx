import React from 'react';

const RAILS_HOST = "http://localhost:3000";

function Header() {
  return (
    <div className="row header" data-sel-delta-scroll="">
     <div className="section">
       <a className="logo" href="/"><img src="/assets/images/logo.png" alt="Logo" /></a>
       <a className="" href={`${RAILS_HOST}/pages/about-doximity`}>About<span className="hide-on-mobile">Doximity</span></a>
       <a className="" href={`${RAILS_HOST}/authors`}>Authors</a>
       <a target="_blank" href="https://workat.doximity.com">We&#39;re Hiring</a>
     </div>
    </div>
  );
}

export default Header;
