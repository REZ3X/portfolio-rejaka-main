import React, { useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface MailFormProps {
  onClose: () => void;
  recipientEmail: string;
}

const XiannyaaMailForm: React.FC<MailFormProps> = ({
  onClose,
  recipientEmail,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormStatus("sending");

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormStatus("success");

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#574655] max-w-xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        style={{
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 30px rgba(227, 159, 194, 0.15) inset",
          animation: "fadeIn 0.4s ease-out forwards",
        }}
      >
        {}
        <div className="sticky top-0 z-10 border-b border-[#574655] bg-gradient-to-r from-[#3a1f37] to-[#2c1927] p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-[#e39fc2] rounded-full mr-3"></div>
            <div className="flex items-center">
              <span className="text-[#e39fc2] text-xl mr-2">✉️</span>
              <h2 className="text-[#f4c1d8] text-xl font-medium">
                Send Message
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
          >
            Close
          </button>
        </div>

        {}
        <div className="p-6 overflow-auto max-h-[calc(80vh-72px)]">
          {}
          <div className="absolute top-16 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e39fc2]">✉️</div>
          </div>

          {formStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#463343] flex items-center justify-center mb-5">
                <div className="text-5xl">✨</div>
              </div>
              <h3 className="text-[#f4c1d8] text-xl font-medium mb-3">
                Message Sent!
              </h3>
              <p className="text-[#f0e6ef] mb-6">
                Your message has been sent successfully.
              </p>
              <p className="text-[#c4b2c3] text-sm">
                I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col space-y-2">
                <div className="text-sm text-[#e39fc2] mb-1">Sending to:</div>
                <div className="bg-[#382736] text-[#f0e6ef] p-3 rounded-xl border border-[#574655]">
                  {recipientEmail}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-sm text-[#e39fc2]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#382736] text-[#f0e6ef] p-3 rounded-xl border border-[#574655] focus:border-[#e39fc2] outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm text-[#e39fc2]">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#382736] text-[#f0e6ef] p-3 rounded-xl border border-[#574655] focus:border-[#e39fc2] outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="subject" className="text-sm text-[#e39fc2]">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-[#382736] text-[#f0e6ef] p-3 rounded-xl border border-[#574655] focus:border-[#e39fc2] outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-sm text-[#e39fc2]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#382736] text-[#f0e6ef] p-3 rounded-xl border border-[#574655] focus:border-[#e39fc2] outline-none transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-[#574655]">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`px-5 py-2.5 bg-gradient-to-r from-[#b4688f] to-[#e39fc2] text-[#2a1e29] text-sm font-medium rounded-full hover:shadow-lg transition-all ${
                    formStatus === "sending"
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:-translate-y-0.5"
                  }`}
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message ✨"}
                </button>
              </div>
            </form>
          )}

          {}
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e39fc2] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaMailForm;
