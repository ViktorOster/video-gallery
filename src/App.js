import React, { Component } from 'react';
import './App.css';
import CategoriesSidebar from './components/CategoriesSidebar';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <main >
          <CategoriesSidebar />
        </main>
      </div>
    );
  }
}

export default App;
