import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}

export default App;