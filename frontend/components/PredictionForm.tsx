"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/components/Icons";

/* ===== Data Constants ===== */
const BRANDS = [
  "ambassador","ashok","aston martin","audi","bajaj","bentley","bmw","chevrolet",
  "citroen","datsun","fiat","force","ford","honda","hummer","hyundai","icml",
  "isuzu","jaguar","jeep","kia","lamborghini","land rover","lexus","mahindra",
  "maruti suzuki","maserati","mercedes-benz","mg","mini","mitsubishi","nissan",
  "opel","porsche","renault","rolls-royce","skoda","ssangyong","tata","toyota",
  "toyota land","volkswagen","volvo",
];

const FUEL_TYPES = ["Petrol", "Diesel", "hybrid", "Hybrid/CNG"];
const TRANSMISSIONS = ["Manual", "Automatic"];
const OWNERS = ["first", "second", "third"];

const LOADING_MESSAGES = [
  "Analyzing market trends…",
  "Comparing similar models…",
  "Evaluating condition factors…",
  "Estimating fair value…",
  "Crunching the numbers…",
  "Almost there…",
];

type FormData = {
  brand: string;
  model: string;
  year: string;
  kmDriven: string;
  transmission: string;
  fuelType: string;
  owner: string;
};

type FieldError = Partial<Record<keyof FormData, string>>;

type PredictionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; price: number; formSnapshot: FormData }
  | { status: "error"; message: string };

/* ===== Component ===== */
export default function PredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    model: "",
    year: "",
    kmDriven: "",
    transmission: "",
    fuelType: "",
    owner: "",
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [prediction, setPrediction] = useState<PredictionState>({ status: "idle" });
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [brandSearch, setBrandSearch] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  // Review state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const filteredBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!formData.brand) newErrors.brand = "Please select a car brand";
    if (!formData.model.trim()) newErrors.model = "Please enter the car model";
    if (!formData.year) newErrors.year = "Please enter the manufacturing year";
    else {
      const y = Number(formData.year);
      if (y < 1990 || y > new Date().getFullYear())
        newErrors.year = `Year must be between 1990 and ${new Date().getFullYear()}`;
    }
    if (!formData.kmDriven) newErrors.kmDriven = "Please enter kilometers driven";
    else if (Number(formData.kmDriven) < 0) newErrors.kmDriven = "KM driven cannot be negative";
    if (!formData.transmission) newErrors.transmission = "Please select transmission type";
    if (!formData.fuelType) newErrors.fuelType = "Please select fuel type";
    if (!formData.owner) newErrors.owner = "Please select ownership status";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPrediction({ status: "loading" });
    setLoadingMsg(0);
    setRating(0);
    setHoverRating(0);
    setFeedback("");
    setFeedbackSent(false);

    // Cycle through loading messages
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const res = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model.toLowerCase().trim(),
          year: Number(formData.year),
          kmDriven: Number(formData.kmDriven),
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          owner: formData.owner,
        }),
      });

      clearInterval(interval);

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const message = errorData?.detail || "Something went wrong. Please try again.";
        setPrediction({ status: "error", message });
        return;
      }

      const data = await res.json();

      if (data.predicted_price == null || data.predicted_price <= 0) {
        setPrediction({
          status: "error",
          message: "Unable to predict price for this vehicle configuration. Please try different details.",
        });
        return;
      }

      // Small delay for dramatic effect
      await new Promise((r) => setTimeout(r, 600));
      setPrediction({
        status: "success",
        price: data.predicted_price,
        formSnapshot: { ...formData },
      });
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      setPrediction({
        status: "error",
        message: "Unable to reach the prediction server. Please ensure the backend is running.",
      });
    }
  };

  const handleReset = () => {
    setPrediction({ status: "idle" });
    setFormData({
      brand: "",
      model: "",
      year: "",
      kmDriven: "",
      transmission: "",
      fuelType: "",
      owner: "",
    });
    setErrors({});
    setBrandSearch("");
    setRating(0);
    setFeedback("");
    setFeedbackSent(false);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      await fetch(`${apiUrl}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: prediction.status === "success" ? prediction.formSnapshot.brand : "",
          model: prediction.status === "success" ? prediction.formSnapshot.model : "",
          year: prediction.status === "success" ? Number(prediction.formSnapshot.year) : 0,
          km_driven: prediction.status === "success" ? Number(prediction.formSnapshot.kmDriven) : 0,
          transmission: prediction.status === "success" ? prediction.formSnapshot.transmission : "",
          fuel_type: prediction.status === "success" ? prediction.formSnapshot.fuelType : "",
          owner: prediction.status === "success" ? prediction.formSnapshot.owner : "",
          predicted_price: prediction.status === "success" ? prediction.price : 0,
          rating,
          feedback,
        }),
      });
      setFeedbackSent(true);
    } catch (error) {
      console.error("Failed to submit review:", error);
      setFeedbackSent(true);
    }
  };

  const capitalize = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

  /* ===== RENDER ===== */
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
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
          <Icons.Logo style={{ width: "28px", height: "28px", color: "var(--accent-primary)" }} />
          <span className="gradient-text" style={{ fontSize: "1.2rem" }}>
            CarVal AI
          </span>
        </Link>
        <Link href="/">
          <button className="btn-secondary" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>
            ← Back to Home
          </button>
        </Link>
      </motion.nav>

      <AnimatePresence mode="wait">
        {/* ===== LOADING STATE ===== */}
        {prediction.status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            {/* Car driving animation */}
            <div className="loading-road">
              <div className="loading-car">
                <Icons.CarSmall style={{ width: "40px", height: "40px", color: "var(--accent-primary)" }} />
              </div>
              <div className="loading-road-line">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>

            {/* Spinning gear */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ color: "var(--accent-secondary)", margin: "20px 0", display: "flex", justifyContent: "center" }}
            >
              <Icons.Gear style={{ width: "40px", height: "40px" }} />
            </motion.div>

            {/* Cycling messages */}
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  color: "var(--accent-secondary)",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {LOADING_MESSAGES[loadingMsg]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div
              style={{
                marginTop: "24px",
                height: "4px",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: "var(--accent-gradient)",
                  borderRadius: "var(--radius-full)",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ===== SUCCESS STATE ===== */}
        {prediction.status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: "100%", maxWidth: "700px" }}
          >
            {/* Price Card */}
            <motion.div
              className="glass-card"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              style={{
                padding: "48px 40px",
                textAlign: "center",
                marginBottom: "24px",
                borderColor: "var(--border-accent)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                style={{ color: "var(--success)", marginBottom: "12px", display: "flex", justifyContent: "center" }}
              >
                <Icons.Check style={{ width: "48px", height: "48px" }} />
              </motion.div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "8px" }}>
                Estimated Market Value
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="gradient-text-warm"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  fontWeight: 800,
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                ₹{prediction.price.toLocaleString("en-IN")}
              </motion.div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Based on current market analysis
              </p>
            </motion.div>

            {/* Input Summary Card */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ padding: "32px", marginBottom: "24px" }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "20px",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                  <Icons.Clipboard style={{ width: "16px", height: "16px" }} /> Your Vehicle Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                }}
              >
                {[
                  { label: "Brand", value: capitalize(prediction.formSnapshot.brand), icon: "Tag" },
                  { label: "Model", value: capitalize(prediction.formSnapshot.model), icon: "CarSmall" },
                  { label: "Year", value: prediction.formSnapshot.year, icon: "Calendar" },
                  { label: "KM Driven", value: `${Number(prediction.formSnapshot.kmDriven).toLocaleString()} km`, icon: "Road" },
                  { label: "Transmission", value: prediction.formSnapshot.transmission, icon: "Gear" },
                  { label: "Fuel Type", value: prediction.formSnapshot.fuelType, icon: "Fuel" },
                  { label: "Ownership", value: capitalize(prediction.formSnapshot.owner) + " Owner", icon: "User" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    style={{
                      padding: "12px 16px",
                      background: "var(--bg-glass)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {Icons[item.icon as keyof typeof Icons]({ style: { width: "12px", height: "12px" } })} {item.label}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Review & Feedback Card */}
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ padding: "32px", marginBottom: "24px" }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icons.Star style={{ width: "16px", height: "16px" }} /> Was this prediction accurate?
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  marginBottom: "20px",
                }}
              >
                Your feedback helps us improve our model
              </p>

              {!feedbackSent ? (
                <>
                  {/* Star Rating */}
                  <div className="star-rating" style={{ marginBottom: "16px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star-btn ${star <= rating ? "active" : ""}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        type="button"
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Icons.Star
                          style={{ width: "32px", height: "32px" }}
                          filled={star <= (hoverRating || rating)}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.85rem",
                          alignSelf: "center",
                          marginLeft: "8px",
                        }}
                      >
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Below Average"}
                        {rating === 3 && "Average"}
                        {rating === 4 && "Good"}
                        {rating === 5 && "Excellent!"}
                      </motion.span>
                    )}
                  </div>

                  {/* Feedback Text */}
                  <textarea
                    className="input-field"
                    placeholder="Share your thoughts about this prediction (optional)…"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    style={{ resize: "vertical", marginBottom: "16px" }}
                  />

                  <button
                    className="btn-primary"
                    onClick={handleFeedbackSubmit}
                    disabled={rating === 0}
                    style={{
                      width: "100%",
                      opacity: rating === 0 ? 0.5 : 1,
                      cursor: rating === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Submit Feedback
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <div style={{ color: "var(--success)", marginBottom: "12px", display: "flex", justifyContent: "center" }}>
                    <Icons.ThankYou style={{ width: "48px", height: "48px" }} />
                  </div>
                  <p style={{ color: "var(--success)", fontWeight: 600, marginBottom: "4px" }}>
                    Thank you for your feedback!
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    Your input helps us build a better prediction model.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button className="btn-primary" onClick={handleReset}>
                Predict Another Car
              </button>
              <Link href="/">
                <button className="btn-secondary">Back to Home</button>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* ===== ERROR STATE ===== */}
        {prediction.status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "48px 40px",
              textAlign: "center",
              borderColor: "var(--error)",
            }}
          >
            <div style={{ color: "var(--error)", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
              <Icons.AlertCircle style={{ width: "48px", height: "48px" }} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "12px" }}>
              Prediction Failed
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.6 }}>
              {prediction.message}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn-primary" onClick={() => setPrediction({ status: "idle" })}>
                Try Different Details
              </button>
              <Link href="/">
                <button className="btn-secondary">Back to Home</button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* ===== FORM STATE ===== */}
        {prediction.status === "idle" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: "100%", maxWidth: "700px" }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ color: "var(--accent-primary)", marginBottom: "12px", display: "flex", justifyContent: "center" }}
              >
                <Icons.CarSmall style={{ width: "48px", height: "48px" }} />
              </motion.div>
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                Car Price <span className="gradient-text">Predictor</span>
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Enter your vehicle details to get an accurate price estimate
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="glass-card" style={{ padding: "32px", marginBottom: "24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {/* Brand - Searchable */}
                  <div style={{ position: "relative" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.Tag style={{ width: "14px", height: "14px" }} /> Car Brand *
                    </label>
                    <input
                      className={`input-field ${errors.brand ? "error" : ""}`}
                      type="text"
                      placeholder="Search brand (e.g., Toyota)…"
                      value={brandSearch}
                      onChange={(e) => {
                        setBrandSearch(e.target.value);
                        setShowBrandDropdown(true);
                        if (formData.brand) {
                          setFormData((prev) => ({ ...prev, brand: "" }));
                        }
                      }}
                      onFocus={() => setShowBrandDropdown(true)}
                      onBlur={() => setTimeout(() => setShowBrandDropdown(false), 200)}
                      id="input-brand"
                    />
                    {formData.brand && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "100%",
                          transform: "translateX(-50%)",
                          marginTop: "6px",
                          background: "var(--accent-primary)",
                          padding: "6px 14px",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 4px 12px rgba(108, 92, 231, 0.4)",
                          whiteSpace: "nowrap",
                          zIndex: 10,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {capitalize(formData.brand)}
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {showBrandDropdown && filteredBrands.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-md)",
                            maxHeight: "200px",
                            overflowY: "auto",
                            zIndex: 50,
                            marginTop: "4px",
                          }}
                        >
                          {filteredBrands.map((brand) => (
                            <div
                              key={brand}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, brand }));
                                setBrandSearch(capitalize(brand));
                                setShowBrandDropdown(false);
                                setErrors((prev) => ({ ...prev, brand: undefined }));
                              }}
                              style={{
                                padding: "10px 14px",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                transition: "background 0.15s",
                                borderBottom: "1px solid var(--border)",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "var(--bg-glass-hover)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "transparent")
                              }
                            >
                              {capitalize(brand)}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.brand && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.brand}
                      </motion.p>
                    )}
                  </div>

                  {/* Model */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.CarSmall style={{ width: "14px", height: "14px" }} /> Car Model *
                    </label>
                    <input
                      className={`input-field ${errors.model ? "error" : ""}`}
                      type="text"
                      name="model"
                      placeholder="e.g., Swift, Civic, i20…"
                      value={formData.model}
                      onChange={handleChange}
                      id="input-model"
                    />
                    {errors.model && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.model}
                      </motion.p>
                    )}
                  </div>

                  {/* Year */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.Calendar style={{ width: "14px", height: "14px" }} /> Year of Manufacture *
                    </label>
                    <input
                      className={`input-field ${errors.year ? "error" : ""}`}
                      type="number"
                      name="year"
                      placeholder="e.g., 2018"
                      value={formData.year}
                      onChange={handleChange}
                      min={1990}
                      max={new Date().getFullYear()}
                      id="input-year"
                    />
                    {errors.year && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.year}
                      </motion.p>
                    )}
                  </div>

                  {/* KM Driven */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.Road style={{ width: "14px", height: "14px" }} /> Kilometers Driven *
                    </label>
                    <input
                      className={`input-field ${errors.kmDriven ? "error" : ""}`}
                      type="number"
                      name="kmDriven"
                      placeholder="e.g., 45000"
                      value={formData.kmDriven}
                      onChange={handleChange}
                      min={0}
                      id="input-km"
                    />
                    {errors.kmDriven && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.kmDriven}
                      </motion.p>
                    )}
                  </div>

                  {/* Transmission */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.Gear style={{ width: "14px", height: "14px" }} /> Transmission *
                    </label>
                    <select
                      className={`input-field ${errors.transmission ? "error" : ""}`}
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      id="input-transmission"
                    >
                      <option value="">Select transmission…</option>
                      {TRANSMISSIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.transmission && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.transmission}
                      </motion.p>
                    )}
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.Fuel style={{ width: "14px", height: "14px" }} /> Fuel Type *
                    </label>
                    <select
                      className={`input-field ${errors.fuelType ? "error" : ""}`}
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      id="input-fuel"
                    >
                      <option value="">Select fuel type…</option>
                      {FUEL_TYPES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    {errors.fuelType && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.fuelType}
                      </motion.p>
                    )}
                  </div>

                  {/* Owner */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      <Icons.User style={{ width: "14px", height: "14px" }} /> Ownership Status *
                    </label>
                    <select
                      className={`input-field ${errors.owner ? "error" : ""}`}
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                      id="input-owner"
                    >
                      <option value="">Select ownership…</option>
                      {OWNERS.map((o) => (
                        <option key={o} value={o}>
                          {capitalize(o)} Owner
                        </option>
                      ))}
                    </select>
                    {errors.owner && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: "var(--error)", fontSize: "0.78rem", marginTop: "4px" }}
                      >
                        {errors.owner}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* All-fields error banner */}
              {Object.keys(errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{
                    background: "rgba(255, 107, 107, 0.1)",
                    border: "1px solid rgba(255, 107, 107, 0.3)",
                    borderRadius: "var(--radius-md)",
                    padding: "14px 20px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--error)",
                    fontSize: "0.9rem",
                  }}
                >
                  <Icons.AlertTriangle style={{ width: "18px", height: "18px", flexShrink: 0 }} />
                  Please fill in all required fields to get your prediction.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "1.1rem",
                }}
                id="btn-predict"
              >
                <Icons.Predict style={{ width: "20px", height: "20px" }} /> Predict Price
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}