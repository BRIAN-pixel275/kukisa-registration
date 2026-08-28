import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Users,
  UserPlus,
  MapPin,
  Search,
  LogOut,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchRegistrations();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting current user:", error);
      return;
    }

    console.log("CURRENT LOGGED-IN USER:", user);

    if (user) {
      setUserEmail(user.email || "");
      console.log("USER ID:", user.id);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    setErrorMessage("");

    console.log("Fetching registrations...");

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("REGISTRATIONS DATA:", data);
    console.log("REGISTRATIONS ERROR:", error);

    if (error) {
      console.error("Error fetching registrations:", error);
      setErrorMessage(
        "Unable to load registrations. Please check your admin permissions."
      );
      setRegistrations([]);
    } else {
      setRegistrations(data || []);
    }

    setLoading(false);
  };

  const filteredRegistrations = registrations.filter((student) => {
    const searchValue = search.toLowerCase();

    return (
      student.full_name?.toLowerCase().includes(searchValue) ||
      student.registration_number?.toLowerCase().includes(searchValue) ||
      student.phone?.toLowerCase().includes(searchValue)
    );
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-label">KUKISA ADMIN PANEL</p>
          <h1>Member Registrations</h1>

          {userEmail && (
            <p className="admin-user-email">
              Logged in as {userEmail}
            </p>
          )}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={22} />
          </div>

          <div>
            <p>Total Registrations</p>
            <h2>{registrations.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <UserPlus size={22} />
          </div>

          <div>
            <p>Showing Results</p>
            <h2>{filteredRegistrations.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MapPin size={22} />
          </div>

          <div>
            <p>Constituencies</p>

            <h2>
              {
                new Set(
                  registrations
                    .map((student) => student.constituency)
                    .filter(Boolean)
                ).size
              }
            </h2>
          </div>
        </div>
      </section>

      <section className="registrations-panel">
        <div className="panel-top">
          <div>
            <h2>Registered Students</h2>
            <p>View and search KUKISA member registrations.</p>
          </div>

          <div className="dashboard-actions">
            <button
              className="refresh-button"
              onClick={fetchRegistrations}
              disabled={loading}
              title="Refresh registrations"
            >
              <RefreshCw size={18} />
            </button>

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search name, registration number or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            Loading registrations...
          </div>
        ) : errorMessage ? (
          <div className="dashboard-error">
            <AlertCircle size={22} />

            <div>
              <strong>Unable to load registrations</strong>
              <p>{errorMessage}</p>
            </div>
          </div>
        ) : (
          <div className="registrations-list">
            {filteredRegistrations.length === 0 ? (
              <div className="no-results">
                No registrations found.
              </div>
            ) : (
              filteredRegistrations.map((student) => (
                <div className="registration-row" key={student.id}>
                  <div className="student-main">
                    <h3>{student.full_name}</h3>

                    <p>{student.registration_number}</p>
                  </div>

                  <div className="student-details">
                    <span>{student.course}</span>

                    <span>{student.constituency}</span>
                  </div>

                  <div className="student-contact">
                    {student.phone}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;