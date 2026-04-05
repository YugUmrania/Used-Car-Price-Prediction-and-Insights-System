import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — CarVal AI",
  description:
    "Learn how CarVal AI collects, uses, and protects your personal information. Read our privacy policy for the Used Car Price Prediction system.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      {/* Navigation */}
      <nav
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="gradient-text">CarVal AI</span>
        </Link>
        <Link href="/">
          <button className="btn-secondary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            ← Back to Home
          </button>
        </Link>
      </nav>

      {/* Content */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Last updated: April 5, 2026
          </p>
        </div>

        <div className="glass-card" style={{ padding: "40px 36px" }}>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "32px" }}>
            CarVal AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            used car price prediction service.
          </p>

          <Section
            number="1"
            title="Information We Collect"
            content={[
              {
                subtitle: "Information You Provide",
                details: [
                  "Vehicle details (brand, model, year, kilometers driven, transmission, fuel type, ownership status)",
                  "Prediction feedback and ratings",
                  "Written feedback or comments about predictions",
                ],
              },
              {
                subtitle: "Automatically Collected Information",
                details: [
                  "Device information (browser type, operating system)",
                  "IP address (for security purposes only)",
                  "Usage data (pages visited, time spent on the site)",
                ],
              },
            ]}
          />

          <Section
            number="2"
            title="How We Use Your Information"
            content={[
              {
                subtitle: "",
                details: [
                  "Provide accurate car price predictions using our XGBoost machine learning model",
                  "Improve the accuracy and performance of our prediction algorithms",
                  "Analyze user feedback to enhance our service",
                  "Monitor and prevent fraudulent or abusive activity",
                  "Generate anonymized, aggregated statistics for research purposes",
                  "Maintain and improve the overall user experience",
                ],
              },
            ]}
          />

          <Section
            number="3"
            title="Data Storage and Security"
            content={[
              {
                subtitle: "",
                details: [
                  "Your review data (ratings, feedback, and associated vehicle details) is stored in a secure SQLite database on our server",
                  "We implement industry-standard security measures to protect your data",
                  "Access to stored data is restricted to authorized developers only",
                  "We do not sell, trade, or rent your personal information to third parties",
                ],
              },
            ]}
          />

          <Section
            number="4"
            title="Data Retention"
            content={[
              {
                subtitle: "",
                details: [
                  "Review data is retained indefinitely for model improvement and service maintenance",
                  "You may request deletion of your review data by contacting us",
                  "Aggregated, anonymized statistics may be retained even after individual data deletion",
                ],
              },
            ]}
          />

          <Section
            number="5"
            title="Third-Party Services"
            content={[
              {
                subtitle: "",
                details: [
                  "Our website is hosted on third-party infrastructure providers",
                  "We use Next.js and FastAPI frameworks, which may collect basic usage telemetry",
                  "We are not responsible for the privacy practices of external linked websites",
                ],
              },
            ]}
          />

          <Section
            number="6"
            title="Cookies and Tracking"
            content={[
              {
                subtitle: "",
                details: [
                  "We do not use cookies for tracking or advertising purposes",
                  "Essential cookies may be used for website functionality (e.g., session management)",
                  "You can control cookie preferences through your browser settings",
                ],
              },
            ]}
          />

          <Section
            number="7"
            title="Your Rights"
            content={[
              {
                subtitle: "",
                details: [
                  "Access the personal data we hold about you",
                  "Request correction of inaccurate data",
                  "Request deletion of your review data",
                  "Object to the processing of your personal data",
                  "Withdraw consent at any time (where processing is based on consent)",
                ],
              },
            ]}
          />

          <Section
            number="8"
            title="Children's Privacy"
            content={[
              {
                subtitle: "",
                details: [
                  "Our service is not directed to individuals under the age of 16",
                  "We do not knowingly collect personal information from children",
                  "If you believe a child has provided us with personal data, please contact us",
                ],
              },
            ]}
          />

          <Section
            number="9"
            title="Changes to This Policy"
            content={[
              {
                subtitle: "",
                details: [
                  "We may update this Privacy Policy from time to time",
                  "Changes will be posted on this page with an updated revision date",
                  "We encourage you to review this policy periodically",
                ],
              },
            ]}
          />

          <Section
            number="10"
            title="Contact Us"
            content={[
              {
                subtitle: "",
                details: [
                  "If you have questions about this Privacy Policy, please contact us at:",
                  "Project: CarVal AI — Used Car Price Prediction & Insights System",
                  "Contributors: Yug Umrania, Parth Thakkar",
                  "This is an academic project developed for educational purposes.",
                ],
              },
            ]}
          />
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}
      >
        <p>© {new Date().getFullYear()} CarVal AI — Built for educational purposes</p>
      </footer>
    </div>
  );
}

function Section({
  number,
  title,
  content,
}: {
  number: string;
  title: string;
  content: { subtitle: string; details: string[] }[];
}) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-full)",
            background: "var(--accent-gradient)",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        {title}
      </h2>
      {content.map((item, i) => (
        <div key={i} style={{ marginBottom: item.subtitle ? "12px" : "0" }}>
          {item.subtitle && (
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-primary)" }}>
              {item.subtitle}
            </h3>
          )}
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            {item.details.map((detail, j) => (
              <li
                key={j}
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                  marginBottom: "4px",
                }}
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
