"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGetStarted } from "@/context/GetStartedContext";

const OPTIONS = [
  "SEO & Marketing",
  "AI & Chatbots",
  "Web Dev",
  "Paid Ads"
];

export default function GetStartedModal() {
  const { isOpen, closeGetStarted } = useGetStarted();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "AI & Chatbots"
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    company: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGetStarted();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Lock scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeGetStarted]);

  // Reset form and errors when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "AI & Chatbots"
      });
      setErrors({
        name: "",
        email: "",
        phone: "",
        company: ""
      });
      setTouched({
        name: false,
        email: false,
        phone: false,
        company: false
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "name") {
      // Allow only alphabetic characters and spaces. Prevent numbers and special characters.
      const filteredValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData(prev => ({ ...prev, name: filteredValue }));
      
      if (value !== filteredValue) {
        setErrors(prev => ({ ...prev, name: "Please enter a valid name." }));
      } else if (touched.name && filteredValue.trim() === "") {
        setErrors(prev => ({ ...prev, name: "Please enter a valid name." }));
      } else {
        setErrors(prev => ({ ...prev, name: "" }));
      }
    } else if (name === "phone") {
      // Allow only numeric values. Restrict input to digits only. Limit to 10 digits.
      const filteredValue = value.replace(/[^0-9]/g, "");
      const limitedValue = filteredValue.slice(0, 10);
      setFormData(prev => ({ ...prev, phone: limitedValue }));
      
      if (value !== filteredValue) {
        setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number." }));
      } else if (touched.phone && limitedValue.length !== 10) {
        setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number." }));
      } else {
        setErrors(prev => ({ ...prev, phone: "" }));
      }
    } else if (name === "email") {
      setFormData(prev => ({ ...prev, email: value }));
      if (touched.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors(prev => ({ ...prev, email: "Please enter a valid email address." }));
        } else {
          setErrors(prev => ({ ...prev, email: "" }));
        }
      }
    } else if (name === "company") {
      setFormData(prev => ({ ...prev, company: value }));
      if (touched.company && value.trim() === "") {
        setErrors(prev => ({ ...prev, company: "Please enter your company or website." }));
      } else {
        setErrors(prev => ({ ...prev, company: "" }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    if (name === "name") {
      const isValid = /^[A-Za-z\s]+$/.test(value);
      if (!isValid) {
        setErrors(prev => ({ ...prev, name: "Please enter a valid name." }));
      } else {
        setErrors(prev => ({ ...prev, name: "" }));
      }
    } else if (name === "phone") {
      const isValid = /^[0-9]{10}$/.test(value);
      if (!isValid) {
        setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number." }));
      } else {
        setErrors(prev => ({ ...prev, phone: "" }));
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: "Please enter a valid email address." }));
      } else {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    } else if (name === "company") {
      if (value.trim() === "") {
        setErrors(prev => ({ ...prev, company: "Please enter your company or website." }));
      } else {
        setErrors(prev => ({ ...prev, company: "" }));
      }
    }
  };

  const handleInterestSelect = (opt: string) => {
    setFormData({ ...formData, interest: opt });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true
    });

    const isNameValid = /^[A-Za-z\s]+$/.test(formData.name);
    const isPhoneValid = /^[0-9]{10}$/.test(formData.phone);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isCompanyValid = formData.company.trim() !== "";

    const newErrors = {
      name: isNameValid ? "" : "Please enter a valid name.",
      email: isEmailValid ? "" : "Please enter a valid email address.",
      phone: isPhoneValid ? "" : "Please enter a valid phone number.",
      company: isCompanyValid ? "" : "Please enter your company or website."
    };

    setErrors(newErrors);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isCompanyValid) {
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          interest: "AI & Chatbots"
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          company: false
        });
        setErrors({
          name: "",
          email: "",
          phone: "",
          company: ""
        });
        closeGetStarted();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          {/* Backdrop Blur */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGetStarted}
          />

          {/* Modal Container */}
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <button
              className="modal-close-btn"
              onClick={closeGetStarted}
              aria-label="Close form"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="modal-form" noValidate>
                {/* Badge */}
                <div className="modal-badge">
                  <span className="badge-dot" />
                  <span>PROTOCOL INITIATION</span>
                </div>

                {/* Heading */}
                <h2 className="modal-heading">Join the BotMate Waitlist</h2>
                <p className="modal-sub">
                  Be among the first to experience the future of AI-powered business scaling.
                </p>

                {/* Form Group */}
                <div className="form-fields-box">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label>Business Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-field half">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phone ? "error" : ""}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    <div className="form-field half">
                      <label>Company / Website</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. mybrand.com"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.company ? "error" : ""}
                      />
                      {errors.company && <span className="error-message">{errors.company}</span>}
                    </div>
                  </div>

                  {/* Selector options */}
                  <div className="form-field">
                    <label>I am interested in...</label>
                    <div className="options-grid">
                      {OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`opt-btn${formData.interest === opt ? " active" : ""}`}
                          onClick={() => handleInterestSelect(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="modal-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Transmitting..." : "Initiate Growth →"}
                  </button>

                  <p className="privacy-sub">
                    We respect your privacy. No spam, ever.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                className="success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">✓</div>
                <h2 className="success-heading">Transmission Sent</h2>
                <p className="success-sub">
                  Your protocol request has been queued. Our business growth executives will contact you shortly.
                </p>
              </motion.div>
            )}
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            :global(.modal-backdrop) {
              position: absolute;
              inset: 0;
              background: rgba(3, 6, 9, 0.85);
              backdrop-filter: blur(12px);
            }
            :global(.modal-container) {
              position: relative;
              z-index: 10;
              width: 100%;
              max-width: 600px;
              background: linear-gradient(135deg, rgba(6, 10, 15, 0.95) 0%, rgba(3, 6, 9, 0.98) 100%);
              border: 1px solid rgba(0, 229, 255, 0.15);
              box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 229, 255, 0.05);
              border-radius: 28px;
              padding: 48px;
              overflow-y: auto;
              max-height: 90vh;
            }
            .modal-close-btn {
              position: absolute;
              top: 24px;
              right: 24px;
              background: transparent;
              border: none;
              color: rgba(255, 255, 255, 0.4);
              cursor: pointer;
              transition: color 0.2s, transform 0.2s;
              padding: 4px;
            }
            .modal-close-btn:hover {
              color: #00e5ff;
              transform: rotate(90deg);
            }
            .modal-form {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .modal-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.25em;
              color: #00e5ff;
              background: rgba(0, 229, 255, 0.06);
              border: 1px solid rgba(0, 229, 255, 0.15);
              padding: 6px 14px;
              border-radius: 50px;
              margin-bottom: 24px;
            }
            .badge-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #00e5ff;
              animation: blink 2s ease-in-out infinite;
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            .modal-heading {
              font-size: clamp(24px, 4vw, 32px);
              font-weight: 800;
              color: #fff;
              letter-spacing: -0.5px;
              margin-bottom: 12px;
              text-align: center;
            }
            .modal-sub {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.5);
              text-align: center;
              margin-bottom: 36px;
              max-width: 440px;
              line-height: 1.5;
            }
            .form-fields-box {
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
            .form-field {
              display: flex;
              flex-direction: column;
              gap: 8px;
              width: 100%;
            }
            .form-row {
              display: flex;
              gap: 20px;
              width: 100%;
            }
            .form-field.half {
              width: 50%;
            }
            label {
              font-size: 12px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.7);
              letter-spacing: 0.02em;
            }
            input {
              width: 100%;
              background: rgba(4, 8, 15, 0.5);
              border: 1px solid rgba(255, 255, 255, 0.08);
              padding: 14px 18px;
              border-radius: 12px;
              color: #fff;
              font-size: 14px;
              transition: all 0.3s ease;
            }
            input:focus {
              outline: none;
              border-color: #00e5ff;
              box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
              background: rgba(0, 229, 255, 0.02);
            }
            .error-message {
              font-size: 11px;
              color: #ff3c5a;
              font-weight: 500;
              margin-top: 2px;
              display: block;
              animation: fadeIn 0.2s ease-in-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-2px); }
              to { opacity: 1; transform: translateY(0); }
            }
            input.error {
              border-color: rgba(255, 60, 90, 0.4);
              box-shadow: 0 0 10px rgba(255, 60, 90, 0.05);
            }
            input.error:focus {
              border-color: #ff3c5a;
              box-shadow: 0 0 15px rgba(255, 60, 90, 0.2);
              background: rgba(255, 60, 90, 0.02);
            }
            .options-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 8px;
            }
            .opt-btn {
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 10px;
              padding: 10px 4px;
              color: rgba(255, 255, 255, 0.6);
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.25s ease;
              text-align: center;
            }
            .opt-btn:hover {
              background: rgba(255, 255, 255, 0.05);
              color: #fff;
            }
            .opt-btn.active {
              background: rgba(0, 229, 255, 0.06);
              border-color: rgba(0, 229, 255, 0.3);
              color: #00e5ff;
              box-shadow: 0 0 12px rgba(0, 229, 255, 0.1);
            }
            .modal-submit-btn {
              background: #00e5ff;
              color: #060a0f;
              border: none;
              padding: 16px;
              border-radius: 14px;
              font-weight: 700;
              font-size: 15px;
              cursor: pointer;
              margin-top: 10px;
              transition: all 0.3s;
              box-shadow: 0 4px 20px rgba(0, 229, 255, 0.3);
            }
            .modal-submit-btn:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 8px 24px rgba(0, 229, 255, 0.5);
              background: #00f7ff;
            }
            .modal-submit-btn:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
            .privacy-sub {
              font-size: 11px;
              color: rgba(255, 255, 255, 0.35);
              text-align: center;
              margin-top: 4px;
            }
            
            /* Success state */
            :global(.success-container) {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px 0;
              text-align: center;
            }
            .success-icon {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: rgba(0, 229, 255, 0.1);
              border: 2px solid #00e5ff;
              color: #00e5ff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 24px;
              box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
            }
            .success-heading {
              font-size: 24px;
              font-weight: 800;
              color: #fff;
              margin-bottom: 12px;
            }
            .success-sub {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.5);
              line-height: 1.6;
              max-width: 360px;
            }

            @media (max-width: 600px) {
              .modal-container {
                padding: 32px 24px;
                border-radius: 20px;
              }
              .form-row {
                flex-direction: column;
                gap: 20px;
              }
              .form-field.half {
                width: 100%;
              }
              .options-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
