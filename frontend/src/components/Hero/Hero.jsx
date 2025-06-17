import React from "react";
import styles from "./Hero.module.css";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { features, roadmaps, testimonials } from "./heroData.jsx";

const Hero = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section
        className={`${styles.hero} ${inView ? styles.fadeInUp : ""}`}
        ref={ref}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.mainHeading}>
            Master Your Programming Journey
          </h1>
          <p className={styles.subHeading}>
            Follow structured roadmaps, join discussions, and learn with a
            global community of developers
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/roadmaps")}
            >
              Explore Roadmaps <ArrowRight />
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/community")}
            >
              Join Community <Users />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmaps Section */}
      <section className={styles.roadmaps}>
        <h2 className={styles.sectionTitle}>Popular Roadmaps</h2>
        <div className={styles.roadmapGrid}>
          {roadmaps.map((r, i) => (
            <div
              key={i}
              className={styles.roadmapCard}
              onClick={() => navigate("/roadmaps")}
            >
              <div className={styles.iconWrapper}>{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <ArrowRight className={styles.arrowIcon} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Developers Are Saying</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <img src={t.avatar} alt={t.name} className={styles.avatar} />
              <h3>{t.name}</h3>
              <p className={styles.role}>{t.title}</p>
              <p className={styles.feedback}>"{t.feedback}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
