import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Users,
  UserPlus,
  MapPin,
  Search,
  LogOut,
  RefreshCw,
  SlidersHorizontal,
  Download,
  X,
  Eye,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      setErrorMessage("Unable to load registrations.");
      setRegistrations([]);
    } else {
      setRegistrations(data || []);
    }

    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRegistrations();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
    }
  };

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedConstituency("");
  };

  const filteredRegistrations = registrations.filter((student) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      student.full_name?.toLowerCase().includes(searchTerm) ||
      student.registration_number
        ?.toLowerCase()
        .includes(searchTerm) ||
      student.phone?.toLowerCase().includes(searchTerm) ||
      student.email?.toLowerCase().includes(searchTerm);

    const matchesYear =
      !selectedYear || student.year_of_study === selectedYear;

    const matchesConstituency =
      !selectedConstituency ||
      student.constituency === selectedConstituency;

    return (
      matchesSearch &&
      matchesYear &&
      matchesConstituency
    );
  });

  const years = [
    ...new Set(
      registrations
        .map((student) => student.year_of_study)
        .filter(Boolean)
    ),
  ].sort();

  const constituencies = [
    ...new Set(
      registrations
        .map((student) => student.constituency)
        .filter(Boolean)
    ),
  ].sort();

  const exportPDF = () => {
    if (filteredRegistrations.length === 0) {
      alert("There are no registrations to export.");
      return;
    }

    const doc = new jsPDF("landscape");

    doc.setFontSize(18);
    doc.text("KUKISA MEMBER REGISTRATIONS", 14, 18);

    doc.setFontSize(9);
    doc.text(
      `Showing ${filteredRegistrations.length} registration(s)`,
      14,
      26
    );

    const tableData = filteredRegistrations.map((student) => [
      student.full_name || "-",
      student.registration_number || "-",
      student.national_id || "-",
      student.phone || "-",
      student.email || "-",
      student.school || "-",
      student.year_of_study || "-",
      student.constituency || "-",
      student.sub_county || "-",
      student.ward || "-",
      student.current_residence || "-",
      student.how_heard_about_kukisa || "-",
    ]);

    autoTable(doc, {
      startY: 32,
      head: [
        [
          "Full Name",
          "Registration No.",
          "National ID",
          "Phone",
          "Email",
          "School / Faculty",
          "Year",
          "Constituency",
          "Sub-County",
          "Ward",
          "Residence",
          "How They Heard",
        ],
      ],
      body: tableData,
      styles: {
        fontSize: 6.5,
        cellPadding: 2,
      },
      headStyles: {
        fontSize: 7,
        fontStyle: "bold",
      },
      margin: {
        left: 10,
        right: 10,
      },
    });

    doc.save("KUKISA-Registrations.pdf");
  };

  const totalConstituencies = new Set(
    registrations
      .map((student) => student.constituency)
      .filter(Boolean)
  ).size;

  return (
    <main className="admin-dashboard">

      {/* ================= HEADER ================= */}

      <header className="admin-header">

        <div className="admin-header-info">
          <p className="admin-label">
            KUKISA ADMIN PANEL
          </p>

          <h1>Member Registrations</h1>

          <p className="admin-user-email">
            Logged in as admin
          </p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>

      </header>


      {/* ================= STATS ================= */}

      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            <Users size={21} />
          </div>

          <div>
            <p>Total Registrations</p>
            <h2>{registrations.length}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <UserPlus size={21} />
          </div>

          <div>
            <p>Showing Results</p>
            <h2>{filteredRegistrations.length}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <MapPin size={21} />
          </div>

          <div>
            <p>Constituencies</p>
            <h2>{totalConstituencies}</h2>
          </div>

        </div>

      </section>


      {/* ================= REGISTRATIONS PANEL ================= */}

      <section className="registrations-panel">

        <div className="panel-top">

          <div className="panel-title">

            <h2>Registered Students</h2>

            <p>
              View, filter and export KUKISA member registrations.
            </p>

          </div>


          <div className="dashboard-actions">

            <button
              className="refresh-button"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh registrations"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "spin" : ""}
              />
            </button>


            <button
              className={`filter-button ${
                showFilters ? "active" : ""
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>


            <button
              className="export-button"
              onClick={exportPDF}
            >
              <Download size={16} />
              Export PDF
            </button>

          </div>

        </div>


        {/* ================= FILTERS ================= */}

        {showFilters && (
          <div className="filter-panel">

            <div className="filter-group">

              <label>Year of Study</label>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(e.target.value)
                }
              >
                <option value="">All Years</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}

              </select>

            </div>


            <div className="filter-group">

              <label>Constituency</label>

              <select
                value={selectedConstituency}
                onChange={(e) =>
                  setSelectedConstituency(e.target.value)
                }
              >
                <option value="">All Constituencies</option>

                {constituencies.map((constituency) => (
                  <option
                    key={constituency}
                    value={constituency}
                  >
                    {constituency}
                  </option>
                ))}

              </select>

            </div>


            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}


        {/* ================= SEARCH ================= */}

        <div className="search-row">

          <div className="search-box">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search name, registration number, phone or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <div className="results-count">
          Showing{" "}
          <strong>{filteredRegistrations.length}</strong>{" "}
          of{" "}
          <strong>{registrations.length}</strong>{" "}
          registrations
        </div>


        {/* ================= ERROR ================= */}

        {errorMessage && (
          <div className="dashboard-error">
            <p>{errorMessage}</p>
          </div>
        )}


        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="dashboard-loading">
            Loading registrations...
          </div>
        ) : (

          <div className="registrations-list">

            {filteredRegistrations.length === 0 ? (

              <div className="no-results">
                No registrations found.
              </div>

            ) : (

              filteredRegistrations.map((student) => (

                <div
                  className="registration-row"
                  key={student.id}
                  onClick={() =>
                    setSelectedStudent(student)
                  }
                >

                  {/* STUDENT */}

                  <div className="student-main">

                    <h3>
                      {student.full_name}
                    </h3>

                    <p>
                      {student.registration_number}
                    </p>

                  </div>


                  {/* DETAILS */}

                  <div className="student-details">

                    {student.school && (
                      <span>
                        {student.school}
                      </span>
                    )}

                    {student.constituency && (
                      <span>
                        {student.constituency}
                      </span>
                    )}

                  </div>


                  {/* PHONE */}

                  <div className="student-contact">

                    {student.phone}

                  </div>


                  {/* VIEW */}

                  <div className="student-view">

                    <Eye size={16} />

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </section>


      {/* ================= STUDENT DETAILS MODAL ================= */}

      {selectedStudent && (

        <div
          className="student-modal-overlay"
          onClick={() =>
            setSelectedStudent(null)
          }
        >

          <div
            className="student-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="student-modal-header">

              <div>

                <p className="admin-label">
                  KUKISA MEMBER
                </p>

                <h2>
                  {selectedStudent.full_name}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedStudent(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="student-modal-content">


              {/* PERSONAL */}

              <div className="detail-section">

                <h3>Personal Information</h3>

                <div className="detail-grid">

                  <div>
                    <span>Phone Number</span>
                    <strong>
                      {selectedStudent.phone || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Email Address</span>
                    <strong>
                      {selectedStudent.email || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Registration Number</span>
                    <strong>
                      {selectedStudent.registration_number || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>National ID</span>
                    <strong>
                      {selectedStudent.national_id || "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* ACADEMIC */}

              <div className="detail-section">

                <h3>Academic Information</h3>

                <div className="detail-grid">

                  <div>
                    <span>Course</span>
                    <strong>
                      {selectedStudent.course || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>School / Faculty</span>
                    <strong>
                      {selectedStudent.school || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Year of Study</span>
                    <strong>
                      {selectedStudent.year_of_study || "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* KIAMBU */}

              <div className="detail-section">

                <h3>Kiambu County Information</h3>

                <div className="detail-grid">

                  <div>
                    <span>Constituency</span>
                    <strong>
                      {selectedStudent.constituency || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Sub-County</span>
                    <strong>
                      {selectedStudent.sub_county || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Ward</span>
                    <strong>
                      {selectedStudent.ward || "-"}
                    </strong>
                  </div>

                  <div>
                    <span>Current Residence / Hostel</span>
                    <strong>
                      {selectedStudent.current_residence || "-"}
                    </strong>
                  </div>

                </div>

              </div>


              {/* ADDITIONAL */}

              <div className="detail-section">

                <h3>Additional Information</h3>

                <div className="detail-grid">

                  <div>
                    <span>How They Heard About KUKISA</span>
                    <strong>
                      {selectedStudent.how_heard_about_kukisa || "-"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default AdminDashboard;