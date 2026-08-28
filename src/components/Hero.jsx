import groupImage from "/src/assets/kukisa-group.jpg";

function Hero() {
  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${groupImage})` }}
      ></div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="welcome-text">WELCOME TO</p>

        <h2 className="hero-title">
          KUKI<span>SA</span>
        </h2>

        <h3>Your Home Away From Home<br />at Kenyatta University.</h3>

        <p className="hero-description">
          Are you a student from Kiambu County? Join a family built on
          unity, friendship, support and connection.
        </p>

        <button className="register-button" onClick={scrollToRegistration}>
          REGISTER NOW
          <span>→</span>
        </button>
      </div>

      <div className="hero-curve"></div>
    </section>
  );
}

export default Hero;