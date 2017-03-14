import React, { Component } from 'react';
import "../../public/assets/stylesheets/application.sass";
import Header from "./header/Header"
import Footer from "./footer/Footer"
import ArticlesContainer from "./articles/ArticlesContainer"

class App extends Component {
  render() {
    return (
      <div className="articles-list has-hero articles">
        <div className="wrap">
          <Header/>
          <ArticlesContainer/>
          <Footer/>
        </div>
     </div>
    );
  }
}

export default App;
