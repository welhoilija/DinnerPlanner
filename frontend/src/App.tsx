import './App.scss'
import Footer from './Footer'
import ReservationList from './ReservationList'
import SessionComponent from './SessionComponent';
import { getSessionKey } from './api';

function App() {
  const sessionKey = getSessionKey();

  return (
    <div className="App">
      <header className="App-header">
        {sessionKey ? (
          <ReservationList />
        ) : (
          <SessionComponent />
        )}
        <Footer
          githubUrl="https://github.com/welhoilija/"
          linkedinUrl="https://www.linkedin.com/in/tuomas-kangas-901207170/"
          email="tkankas@gmail.com"
        />
      </header>
    </div>
  )
}

export default App
