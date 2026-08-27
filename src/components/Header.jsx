import logo from "../assets/kukisa-logo.png";

function Header() {
  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="KUKISA Logo" className="header-logo" />

        <div>
          <h1>KUKISA</h1>
          <p>Kenyatta University Kiambu<br />Students Association</p>
        </div>
      </div>

      <button className="join-button" onClick={scrollToRegistration}>
        JOIN KUKISA
      </button>
    </header>
  );
}

export default Header;