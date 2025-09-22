"use client";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RegistrationForm {
  name: string;
  email: string;
  pin: string;
}

interface ExistingUserCheck {
  name: string;
  pin: string;
}

const SeminarRegisterPage: React.FC = () => {
  const { themeStyle } = useUser();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showExistingUserForm, setShowExistingUserForm] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    email: "",
    pin: "",
  });
  const [existingUserData, setExistingUserData] = useState<ExistingUserCheck>({
    name: "",
    pin: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBackToMain = () => {
    router.push("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.pin.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.pin.length !== 4 || !/^\d{4}$/.test(formData.pin)) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/seminar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        if (data.existing) {
          setError(data.message);
          setShowExistingUserForm(true);
          setShowForm(false);
        } else {
          const qrResponse = await fetch("/api/seminar/generate-qr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: data.code }),
          });

          if (qrResponse.ok) {
            const blob = await qrResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `EMW-Ticket-${data.code}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }

          setFormData({ name: "", email: "", pin: "" });
          setShowForm(false);
          setShowThankYouPopup(true);
        }
      } else {
        setError(data.message || "An error occurred during registration");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExistingUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!existingUserData.name.trim() || !existingUserData.pin.trim()) {
      setError("Name and PIN are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/seminar/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingUserData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Your QR Code ticket will be re-downloaded.");
        const qrResponse = await fetch("/api/seminar/generate-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: data.code }),
        });

        if (qrResponse.ok) {
          const blob = await qrResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `EMW-Ticket-${data.code}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }

        setExistingUserData({ name: "", pin: "" });
        setShowExistingUserForm(false);
      } else {
        setError(data.message || "Data not found or incorrect PIN");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (themeStyle !== "terminal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a1f29] to-[#1a1420] text-[#f0e6ef] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-[#e39fc2] mb-2">
              Seminar Registration
            </h1>
            <p className="text-[#c4b2c3]">
              This page is optimized for terminal theme.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono p-4 relative">
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a1017] border border-[#00adb4] rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-[#00ff88] text-4xl mb-4">✅</div>
              <h3 className="text-[#00adb4] text-xl font-bold mb-3">
                Registration Successful!
              </h3>
              <p className="text-[#c4d1d9] mb-6">
                Thank you for registering to the English Mini Seminar. Your QR code ticket has been downloaded automatically.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleBackToMain}
                  className="flex-1 bg-[#00adb4] text-[#060a10] py-3 px-4 font-bold hover:bg-[#4dd0e1] transition-colors rounded"
                >
                  GO TO MAIN PAGE
                </button>
                <button
                  onClick={() => setShowThankYouPopup(false)}
                  className="flex-1 border border-[#393d46] text-[#c4d1d9] py-3 px-4 hover:border-[#00adb4] hover:text-[#00adb4] transition-colors rounded"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBackToMain}
            className="flex items-center space-x-2 text-[#8b9cbe] hover:text-[#00adb4] transition-colors"
          >
            <span>←</span>
            <span>Back to Main</span>
          </button>
        </div>

        <div className="border border-[#393d46] bg-[#0a1017] p-6 mb-6">
          <div className="text-center">
            <h1 className="text-2xl text-[#00adb4] mb-2">
              ❯ English Mini Seminar
            </h1>
            <p className="text-[#8b9cbe] text-sm">
              Professionalism in Software Engineering: SDLC and Git Standards
            </p>
          </div>
        </div>

        <div className="border border-[#393d46] bg-[#0a1017] p-6 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-[#00adb4] text-lg mb-4">Event Poster</h2>
            <div className="flex justify-center">
              <Image
                src="/assets/images/seminar/poster.png"
                alt="English Mini Seminar Poster"
                width={400}
                height={600}
                className="border border-[#393d46] rounded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-[#393d46] bg-[#0a1017] p-4 rounded">
            <h3 className="text-[#00adb4] text-lg mb-3">📅 Event Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-[#8b9cbe] min-w-[80px]">Date:</span>
                <span className="text-[#e0e0e0] font-medium">
                  Friday, September 26, 2025
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-[#8b9cbe] min-w-[80px]">Time:</span>
                <span className="text-[#e0e0e0] font-medium">
                  09:30 - 11:30 AM WIB
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-[#8b9cbe] min-w-[80px]">Venue:</span>
                <span className="text-[#e0e0e0] font-medium">
                  Arjuna Room, SMK Negeri 2 Depok
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-[#8b9cbe] min-w-[80px]">Fee:</span>
                <span className="text-[#00ff88] font-bold">FREE</span>
              </div>
            </div>
          </div>

          <div className="border border-[#393d46] bg-[#0a1017] p-4 rounded">
            <h3 className="text-[#00adb4] text-lg mb-3">
              👥 Speakers & Topic
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[#e0e0e0] font-bold">
                  Rizky Fauzan H.
                </div>
                <div className="text-[#8b9cbe]">
                  Network Engineer (MTCNA & MTCTCE)
                </div>
              </div>
              <div>
                <div className="text-[#e0e0e0] font-bold">
                  Rejaka Abimanyu S.
                </div>
                <div className="text-[#8b9cbe]">
                  CITO of Slaviors, Web Developer
                </div>
              </div>
              <div className="mt-3">
                <div className="text-[#00adb4] mb-2 font-medium">
                  Topic Discussion:
                </div>
                <ul className="text-[#c4d1d9] space-y-1 ml-2">
                  <li>• Software Development Life Cycle (SDLC)</li>
                  <li>• Git Standards & Best Practices</li>
                  <li>• Professional Development Workflow</li>
                  <li>• Industry Standards Implementation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#393d46] bg-[#0a1017] p-4 sm:p-6 rounded">
          <h3 className="text-[#00adb4] text-lg mb-4">🎯 Registration</h3>

          {!showForm && !showExistingUserForm && (
            <div className="text-center space-y-4">
              <p className="text-[#c4d1d9] mb-6 text-sm sm:text-base">
                Register now to secure your spot in this seminar!
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00adb4] text-[#060a10] font-bold hover:bg-[#4dd0e1] transition-colors rounded text-sm sm:text-base"
                >
                  [NEW REGISTRATION]
                </button>
                <button
                  onClick={() => setShowExistingUserForm(true)}
                  className="w-full sm:w-auto px-6 py-3 border border-[#393d46] text-[#c4d1d9] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors rounded text-sm sm:text-base"
                >
                  [RE-DOWNLOAD TICKET]
                </button>
              </div>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="Enter your full name"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="example@email.com"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  PIN (4 digits) *
                </label>
                <input
                  type="text"
                  value={formData.pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setFormData({ ...formData, pin: value });
                  }}
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="1234"
                  maxLength={4}
                />
                <p className="text-[#8b9cbe] text-xs mt-2">
                  This PIN will be used to re-download your ticket if needed
                </p>
              </div>

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#00adb4] text-[#060a10] p-3 font-bold hover:bg-[#4dd0e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
                >
                  {loading ? "PROCESSING..." : "REGISTER NOW"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "", email: "", pin: "" });
                    setError("");
                    setMessage("");
                  }}
                  className="w-full sm:w-auto px-6 py-3 border border-[#393d46] text-[#c4d1d9] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors rounded"
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}

          {showExistingUserForm && (
            <form onSubmit={handleExistingUser} className="space-y-4">
              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={existingUserData.name}
                  onChange={(e) =>
                    setExistingUserData({
                      ...existingUserData,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="Enter your registered name"
                />
              </div>

              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  PIN (4 digits) *
                </label>
                <input
                  type="text"
                  value={existingUserData.pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setExistingUserData({ ...existingUserData, pin: value });
                  }}
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="1234"
                  maxLength={4}
                />
              </div>

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#00adb4] text-[#060a10] p-3 font-bold hover:bg-[#4dd0e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
                >
                  {loading ? "VERIFYING..." : "DOWNLOAD TICKET"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowExistingUserForm(false);
                    setExistingUserData({ name: "", pin: "" });
                    setError("");
                    setMessage("");
                  }}
                  className="w-full sm:w-auto px-6 py-3 border border-[#393d46] text-[#c4d1d9] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors rounded"
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 border border-[#ff4444] bg-[#ff4444] bg-opacity-10 text-[#fffff] text-sm rounded">
              ⚠️ {error}
            </div>
          )}

          {message && (
            <div className="mt-4 p-3 border border-[#00ff88] bg-[#00ff88] bg-opacity-10 text-black text-sm rounded">
              ✅ {message}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-[#8b9cbe] space-y-1">
          <p>
            For more information, contact:{" "}
            <span className="text-[#00adb4]">+62 895 2577 7781</span>
          </p>
          <p>
            Website:{" "}
            <span className="text-[#00adb4]">https://rejaka.id/seminar/register</span>
          </p>
          <p>
            Powered by <span className="text-[#00adb4]">rejaka.id</span> •{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeminarRegisterPage;