import './App.scss';
import Footer from './Footer';
import ReservationList from './ReservationList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReservationList />
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
