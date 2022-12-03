import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import {Route, Routes} from "react-router-dom";
import EditQuote from "./components/EditQuote/EditQuote";

function App() {
  return (
    <div className="App">
      <Header/>

      <main className="main-block">
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/quotes" element={(<Home/>)}/>
          <Route path="/quotes/:category" element={(<Home/>)}/>

          <Route path="/add-quote" element={(<EditQuote/>)}/>
          <Route path="/quotes/:id/edit" element={(<EditQuote/>)}/>

          <Route path="*" element={(<h1>Not found!</h1>)}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
