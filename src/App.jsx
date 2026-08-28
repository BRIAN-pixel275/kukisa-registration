import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <RegistrationForm />
      <Footer />
    </>
  );
}

function Admin() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Check whether an admin is already logged in
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setCheckingSession(false);
    };

    checkSession();

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (checkingSession) {
    return (
      <div className="admin-loading-page">
        Checking access...
      </div>
    );
  }

  return session ? (
    <AdminDashboard />
  ) : (
    <AdminLogin />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;