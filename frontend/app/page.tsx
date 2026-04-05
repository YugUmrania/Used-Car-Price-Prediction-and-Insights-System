"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";

const features = [
  {
    icon: "Lightning",
    title: "Instant Valuation",
    description: "Get accurate price predictions in seconds using our XGBoost AI model.",
  },
  {
    icon: "Chart",
    title: "Market Intelligence",
    description: "Powered by real market data from thousands of used car transactions.",
  },
  {
    icon: "Target",
    title: "Precision Accuracy",
    description: "Fine-tuned model delivering reliable estimates you can trust.",
  },
];

const stats = [
  { value: "10K+", label: "Cars Analyzed" },
  { value: "43+", label: "Car Brands" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "< 1s", label: "Prediction Time" },
];

const brands = [
  "Toyota", "Honda", "Hyundai", "Maruti Suzuki", "BMW", "Mercedes-Benz",
  "Audi", "Mahindra", "Tata", "Kia", "Volkswagen", "Ford",
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Car Illustration */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "80px",
            height: "80px",
            marginBottom: "20px",
            color: "var(--accent-primary)",
            filter: "drop-shadow(0 20px 40px rgba(108, 92, 231, 0.3))",
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          <Icons.CarHero style={{ width: "100%", height: "100%" }} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            background: "var(--bg-glass)",
            border: "1px solid var(--border-accent)",
            borderRadius: "var(--radius-full)",
            fontSize: "0.85rem",
            color: "var(--accent-secondary)",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Icons.Brain style={{ width: "14px", height: "14px" }} />
          Powered by XGBoost AI
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "20px",
            maxWidth: "800px",
            letterSpacing: "-0.02em",
          }}
        >
          Predict Smart.{" "}
          <span className="gradient-text">Drive Smarter.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          Get the true market value of any used car in seconds. Our AI analyzes
          thousands of data points to deliver precise, trustworthy price
          predictions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/predict">
            <button className="btn-primary" id="cta-predict">
              Predict Price Now
              <span style={{ fontSize: "1.1rem" }}>
                <Icons.ArrowRight style={{ width: "18px", height: "18px" }} />
              </span>
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="btn-secondary" id="cta-learn">
              How It Works
            </button>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => {
            document.getElementById("stats-bar")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: "1.2rem" }}
          >
            <Icons.ChevronDown style={{ width: "20px", height: "20px" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section
        id="stats-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(24px, 4vw, 60px)",
          flexWrap: "wrap",
          padding: "40px 20px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-glass)",
          backdropFilter: "blur(20px)",
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              textAlign: "center",
              minWidth: "120px",
              padding: "16px 24px",
              borderRadius: "var(--radius-md)",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-glass)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(108, 92, 231, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="gradient-text"
              style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "4px" }}
            >
              {stat.value}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="how-it-works"
        style={{
          padding: "100px 20px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            How It <span className="gradient-text">Works</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto" }}>
            Three simple steps to discover the true value of any used car
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ padding: "36px 28px", textAlign: "center" }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--bg-glass-hover)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  margin: "0 auto 20px",
                  border: "1px solid var(--border)",
                  color: "var(--accent-primary)",
                }}
              >
                {Icons[feature.icon as keyof typeof Icons]({ style: { width: "28px", height: "28px" } })}
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SUPPORTED BRANDS ===== */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            marginBottom: "40px",
          }}
        >
          Supports <span className="gradient-text">43+ Brands</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08, borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}
              style={{
                padding: "10px 20px",
                background: "var(--bg-glass)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                cursor: "default",
                transition: "all 0.3s ease",
              }}
            >
              {brand}
            </motion.span>
          ))}
          <span
            style={{
              padding: "10px 20px",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-accent)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.9rem",
              color: "var(--accent-secondary)",
            }}
          >
            + 31 more
          </span>
        </motion.div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "60px 40px",
            borderColor: "var(--border-accent)",
            cursor: "default",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          whileHover={{
            borderColor: "var(--accent-primary)",
            boxShadow: "0 0 60px rgba(108, 92, 231, 0.2)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Ready to know your car&apos;s{" "}
            <span className="gradient-text-warm">true value</span>?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "32px",
              maxWidth: "420px",
              margin: "0 auto 32px",
            }}
          >
            Join thousands who trust our AI-powered predictions. It&apos;s free, fast,
            and incredibly accurate.
          </p>
          <Link href="/predict">
            <button className="btn-primary" id="cta-predict-bottom">
              Start Free Prediction
              <span style={{ fontSize: "1.1rem" }}>
                <Icons.ArrowRight style={{ width: "18px", height: "18px" }} />
              </span>
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <p style={{ marginBottom: "12px" }}>
          © {new Date().getFullYear()} CarVal AI — Built with{" "}
          <Icons.Brain style={{ width: "14px", height: "14px", display: "inline", verticalAlign: "middle" }} />{" "}
          XGBoost &{" "}
          <Icons.Heart style={{ width: "14px", height: "14px", display: "inline", verticalAlign: "middle" }} />{" "}
          Next.js
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <Link
            href="/privacy-policy"
            style={{
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            style={{
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}