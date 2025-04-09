import React, { useEffect, useRef, useState } from "react";

interface MailFormProps {
  onClose: () => void;
  recipientEmail: string;
}

const MailForm: React.FC<MailFormProps> = ({ onClose, recipientEmail }) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-md w-full overflow-hidden"
      >
        <div className="sticky top-0 bg-[#060a10] z-10 border-b border-[#393d46] flex justify-between items-center p-3">
          <div className="flex items-center">
            <span className="text-[#00adb4] text-lg mr-2">📧</span>
            <h2 className="text-[#00adb4] text-lg font-bold">Send Message</h2>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] text-xs"
          >
            [x] close
          </button>
        </div>

        <div className="p-4">
          {formStatus === "success" ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-[#00adb4] text-lg mb-2">Message Sent!</h3>
              <p className="text-sm">
                Your message has been sent successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="text-xs text-[#00adb4] mb-1">To:</div>
                <div className="bg-[#0c1219] text-sm p-2 border border-[#393d46]">
                  {recipientEmail}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-xs text-[#00adb4]">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#0c1219] text-sm p-2 border border-[#393d46] focus:border-[#00adb4] outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-xs text-[#00adb4]">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#0c1219] text-sm p-2 border border-[#393d46] focus:border-[#00adb4] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="subject" className="text-xs text-[#00adb4]">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-[#0c1219] text-sm p-2 border border-[#393d46] focus:border-[#00adb4] outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="message" className="text-xs text-[#00adb4]">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#0c1219] text-sm p-2 border border-[#393d46] focus:border-[#00adb4] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-2 border-t border-[#393d46]">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`px-4 py-2 bg-[#0c1219] border border-[#00adb4] text-[#00adb4] text-sm hover:bg-[#107f84] hover:text-white transition-colors ${
                    formStatus === "sending"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailForm;
