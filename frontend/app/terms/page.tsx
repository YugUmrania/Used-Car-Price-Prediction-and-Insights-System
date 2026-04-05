import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — CarVal AI",
  description:
    "Read the terms and conditions for using CarVal AI's used car price prediction service. Understand your rights and responsibilities.",
};

export default function TermsPage() {
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
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Last updated: April 5, 2026
          </p>
        </div>

        <div className="glass-card" style={{ padding: "40px 36px" }}>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "32px" }}>
            By accessing and using CarVal AI (&quot;the Service&quot;), you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of these terms, you may not access the Service.
          </p>

          <Section
            number="1"
            title="Acceptance of Terms"
            content={[
              {
                subtitle: "",
                details: [
                  "By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions",
                  "These terms apply to all users, visitors, and others who access or use the Service",
                  "We reserve the right to modify these terms at any time, and continued use constitutes acceptance of changes",
                ],
              },
            ]}
          />

          <Section
            number="2"
            title="Nature of the Service"
            content={[
              {
                subtitle: "",
                details: [
                  "CarVal AI provides estimated used car price predictions using machine learning (XGBoost) algorithms",
                  "Predictions are based on historical market data and statistical models",
                  "The Service is provided for informational and educational purposes only",
                  "This is an academic project developed as part of a Semester Guided Project (SGP)",
                ],
              },
            ]}
          />

          <Section
            number="3"
            title="Disclaimer of Accuracy"
            content={[
              {
                subtitle: "",
                details: [
                  "Price predictions are estimates and should not be relied upon as definitive valuations",
                  "Actual market prices may vary significantly based on condition, location, demand, and other factors not captured by our model",
                  "We do not guarantee the accuracy, completeness, or reliability of any predictions",
                  "Users should consult professional appraisers or market research for critical financial decisions",
                  "The Service is provided &quot;as is&quot; without warranties of any kind, either express or implied",
                ],
              },
            ]}
          />

          <Section
            number="4"
            title="Limitation of Liability"
            content={[
              {
                subtitle: "",
                details: [
                  "CarVal AI and its contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages",
                  "We are not responsible for any financial losses resulting from reliance on our predictions",
                  "Users assume full responsibility for any decisions made based on the information provided by the Service",
                  "Our total liability shall not exceed the amount paid by you to use the Service (currently zero, as the Service is free)",
                ],
              },
            ]}
          />

          <Section
            number="5"
            title="Acceptable Use"
            content={[
              {
                subtitle: "You agree not to:",
                details: [
                  "Use the Service for any unlawful purpose or in violation of any laws",
                  "Attempt to gain unauthorized access to our systems, databases, or APIs",
                  "Use automated systems (bots, scrapers) to access the Service without permission",
                  "Submit false, misleading, or malicious data through the prediction form",
                  "Attempt to reverse-engineer, decompile, or extract our machine learning model",
                  "Use the Service to harass, defame, or harm other users",
                  "Overload or disrupt the Service through excessive requests or attacks",
                ],
              },
            ]}
          />

          <Section
            number="6"
            title="Intellectual Property"
            content={[
              {
                subtitle: "",
                details: [
                  "The Service, including its source code, design, algorithms, and content, is the intellectual property of the project contributors",
                  "The machine learning model, training data pipelines, and preprocessing logic are proprietary",
                  "You may not reproduce, distribute, modify, or create derivative works without explicit permission",
                  "Brand names and logos mentioned belong to their respective owners and are used for identification purposes only",
                ],
              },
            ]}
          />

          <Section
            number="7"
            title="User Feedback and Reviews"
            content={[
              {
                subtitle: "",
                details: [
                  "By submitting feedback or ratings, you grant us the right to store and use that data for service improvement",
                  "Feedback must be honest and based on genuine experience with the Service",
                  "We reserve the right to remove inappropriate, offensive, or spam feedback",
                  "Submitted feedback data is stored securely and used only for analytical purposes",
                ],
              },
            ]}
          />

          <Section
            number="8"
            title="Third-Party Links and Services"
            content={[
              {
                subtitle: "",
                details: [
                  "The Service may contain links to third-party websites or services",
                  "We are not responsible for the content, terms, or privacy practices of third-party sites",
                  "Accessing third-party links is at your own risk",
                ],
              },
            ]}
          />

          <Section
            number="9"
            title="Service Availability"
            content={[
              {
                subtitle: "",
                details: [
                  "We strive to maintain uninterrupted service but do not guarantee 100% availability",
                  "The Service may be temporarily unavailable due to maintenance, updates, or technical issues",
                  "We reserve the right to modify, suspend, or discontinue the Service at any time without notice",
                ],
              },
            ]}
          />

          <Section
            number="10"
            title="Termination"
            content={[
              {
                subtitle: "",
                details: [
                  "We may terminate or suspend your access to the Service immediately, without prior notice, for any violation of these Terms",
                  "Upon termination, your right to use the Service will cease immediately",
                ],
              },
            ]}
          />

          <Section
            number="11"
            title="Governing Law"
            content={[
              {
                subtitle: "",
                details: [
                  "These Terms shall be governed by and construed in accordance with the laws of India",
                  "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in the project contributors&apos; jurisdiction",
                ],
              },
            ]}
          />

          <Section
            number="12"
            title="Contact Information"
            content={[
              {
                subtitle: "",
                details: [
                  "For questions about these Terms and Conditions, please contact:",
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
