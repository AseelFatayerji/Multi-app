import logo from './logo.svg';
import '../CSS/Navbar.css';

function Navbar() {
  return (
    <div className="Navbar">
      <header className="Navbar-header">
        <img src={logo} className="Navbar-logo" alt="logo" />
        <p>
          Edit <code>src/Navbar.js</code> and save to reload.
        </p>
        <a
          className="Navbar-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Navbar;
