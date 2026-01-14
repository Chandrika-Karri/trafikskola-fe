import { useState } from "react";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      {/* DARK MODE TOGGLE */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* HERO */}
      <section className="hero">
        <h1>Professional Trafikskola in Sweden</h1>
        <p>
          Learn to drive with confidence. Certified instructors, flexible
          scheduling, and an easy online booking system.
        </p>
      </section>

      {/* INFO CARDS */}
      <section className="info-grid">
        <div className="info-card">
          <h3>🚗 Driving Courses</h3>
          <p>
            Beginner to advanced driving lessons designed according to Swedish
            traffic laws.
          </p>
        </div>

        <div className="info-card">
          <h3>👨‍🏫 Experienced Instructors</h3>
          <p>
            Patient, certified instructors who focus on safety and confidence.
          </p>
        </div>

        <div className="info-card">
          <h3>📅 Online Booking</h3>
          <p>
            Book lessons in real time and choose manual or automatic transmission.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            ⭐⭐⭐⭐⭐
            <p>
              “Great instructors and very flexible booking system. Highly
              recommended!”
            </p>
            <span>- Anna S.</span>
          </div>

          <div className="testimonial">
            ⭐⭐⭐⭐⭐
            <p>
              “I passed my driving test on the first attempt. Excellent teaching!”
            </p>
            <span>- Erik L.</span>
          </div>

          <div className="testimonial">
            ⭐⭐⭐⭐⭐
            <p>
              “Perfect for beginners. Calm instructors and clear explanations.”
            </p>
            <span>- Maria K.</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>📍 Stockholm, Sweden</p>
        <p>📞 +46 70 123 45 67</p>
        <p>✉️ info@trafikskola.se</p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Your Driving Journey Today</h2>
        <p>
          Register, explore available courses, and book your first driving lesson
          online.
        </p>
      </section>
    </div>
  );
}

export default Home;
