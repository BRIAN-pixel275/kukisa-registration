import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Building2,
  MapPin,
  Map,
  Home,
  Megaphone,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    registrationNumber: "",
    course: "",
    faculty: "",
    yearOfStudy: "",
    constituency: "",
    subCounty: "",
    ward: "",
    residence: "",
    referral: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please confirm that your information is correct.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("registrations").insert([
      {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        registration_number: formData.registrationNumber,
        course: formData.course,
        faculty: formData.faculty,
        year_of_study: formData.yearOfStudy,
        constituency: formData.constituency,
        sub_county: formData.subCounty,
        ward: formData.ward || null,
        residence: formData.residence || null,
        referral: formData.referral || null,
        consent: formData.consent,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Registration error:", error);

      if (error.code === "23505") {
        alert(
          "This registration number has already been registered with KUKISA."
        );
      } else {
        alert(
          "Something went wrong while submitting your registration. Please check your internet connection and try again."
        );
      }

      return;
    }

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      registrationNumber: "",
      course: "",
      faculty: "",
      yearOfStudy: "",
      constituency: "",
      subCounty: "",
      ward: "",
      residence: "",
      referral: "",
      consent: false,
    });

    setSuccess(true);
  };

  const handleBackToTop = () => {
    setSuccess(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (success) {
    return (
      <section className="registration-section success-section" id="registration">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={52} />
          </div>

          <p className="success-label">REGISTRATION SUCCESSFUL</p>

          <h2>WELCOME TO KUKISA! 🎉</h2>

          <p className="success-intro">
            Your membership registration has been submitted successfully.
          </p>

          <p className="success-message">
            Thank you for joining the Kenyatta University Kiambu Students
            Association. We are excited to have you as part of the KUKISA
            family!
          </p>

          <div className="success-divider"></div>

          <p className="success-note">
            Stay connected with us for upcoming activities, events and updates.
          </p>

          <button className="success-button" onClick={handleBackToTop}>
            BACK TO KUKISA
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="registration-section" id="registration">
      <div className="registration-heading">
        <span></span>
        <h2>JOIN KUKISA TODAY</h2>
        <span></span>
      </div>

      <p className="registration-subtitle">
        Fill in your details below to become a member.
      </p>

      <form className="registration-form" onSubmit={handleSubmit}>
        {/* PERSONAL INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <User size={20} />
            <h3>PERSONAL INFORMATION</h3>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Full Name *</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number *</label>

              <div className="input-wrapper">
                <Phone size={18} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="07XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label>Email Address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACADEMIC INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <GraduationCap size={20} />
            <h3>ACADEMIC INFORMATION</h3>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Registration Number *</label>

              <div className="input-wrapper">
                <BookOpen size={18} />

                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="e.g. F56/12345/2026"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Course *</label>

              <div className="input-wrapper">
                <BookOpen size={18} />

                <input
                  type="text"
                  name="course"
                  placeholder="Enter your course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>School / Faculty *</label>

              <div className="input-wrapper">
                <Building2 size={18} />

                <input
                  type="text"
                  name="faculty"
                  placeholder="Your school or faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Year of Study *</label>

              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
              >
                <option value="">Select year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
                <option value="5">Fifth Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* KIAMBU COUNTY INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <MapPin size={20} />
            <h3>KIAMBU COUNTY INFORMATION</h3>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Constituency *</label>

              <select
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                required
              >
                <option value="">Select constituency</option>
                <option value="Gatundu North">Gatundu North</option>
                <option value="Gatundu South">Gatundu South</option>
                <option value="Juja">Juja</option>
                <option value="Thika Town">Thika Town</option>
                <option value="Ruiru">Ruiru</option>
                <option value="Githunguri">Githunguri</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Kiambaa">Kiambaa</option>
                <option value="Kabete">Kabete</option>
                <option value="Kikuyu">Kikuyu</option>
                <option value="Limuru">Limuru</option>
                <option value="Lari">Lari</option>
              </select>
            </div>

            <div className="input-group">
              <label>Sub-county *</label>

              <div className="input-wrapper">
                <Map size={18} />

                <input
                  type="text"
                  name="subCounty"
                  placeholder="Enter your sub-county"
                  value={formData.subCounty}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Ward (Optional)</label>

              <div className="input-wrapper">
                <MapPin size={18} />

                <input
                  type="text"
                  name="ward"
                  placeholder="Enter your ward"
                  value={formData.ward}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Current Residence / Hostel</label>

              <div className="input-wrapper">
                <Home size={18} />

                <input
                  type="text"
                  name="residence"
                  placeholder="Optional"
                  value={formData.residence}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFORMATION */}
        <div className="form-section additional-section">
          <div className="form-section-title">
            <Megaphone size={20} />
            <h3>ADDITIONAL INFORMATION</h3>
          </div>

          <div className="input-group">
            <label>How did you hear about KUKISA?</label>

            <select
              name="referral"
              value={formData.referral}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Friend">Friend</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Instagram">Instagram</option>
              <option value="KUKISA Executive">KUKISA Executive</option>
              <option value="Event">KUKISA Event</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* CONSENT */}
        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />

          <span>
            I confirm that the information provided is true and accurate. I
            agree to be contacted regarding KUKISA activities and updates.
          </span>
        </label>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
          {!loading && <span>→</span>}
        </button>

        <div className="secure-message">
          <LockKeyhole size={16} />
          <p>Your information will only be used for KUKISA purposes.</p>
        </div>
      </form>
    </section>
  );
}

export default RegistrationForm;