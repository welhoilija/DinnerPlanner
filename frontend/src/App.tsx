import React, { useState } from "react";
import "./App.scss";
import Footer from "./Footer";
import ReservationList from "./ReservationList";
import SessionComponent from "./SessionComponent";

function App() {
  const [currentSessionKey, setCurrentSessionKey] = useState(() => {
    return localStorage.getItem("sessionKey") || "";
  });

  const handleSessionCreated = (sessionKey: string) => {
    localStorage.setItem("sessionKey", sessionKey);
    setCurrentSessionKey(sessionKey);
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentSessionKey ? (
          <ReservationList />
        ) : (
          <SessionComponent onSessionCreated={handleSessionCreated} />
        )}
        <Footer
          githubUrl="https://github.com/welhoilija/"
          linkedinUrl="https://www.linkedin.com/in/tuomas-kangas-901207170/"
          email="tkankas@gmail.com"
        />
      </header>
    </div>
  );
}

export default App;
