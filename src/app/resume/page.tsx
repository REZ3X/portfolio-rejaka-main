"use client";
import React, { useState, useEffect } from "react";

const ResumePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900 font-resume">
        <div className="print:hidden fixed top-4 right-4 z-10">
          <button
            onClick={handlePrint}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-medium shadow-lg transition-colors"
          >
            Print Resume
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white">
          <header className="text-center mb-4 pb-3 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Rejaka Abimanyu Susanto
            </h1>
            <p className="text-gray-600 text-sm mb-2">Web Developer</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
              <a
                href="mailto:abim@rejaka.me"
                className="hover:underline print:text-gray-600"
              >
                abim@rejaka.me
              </a>
              <span>•</span>
              <a
                href="https://rejaka.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                rejaka.me
              </a>
              <span>•</span>
              <a
                href="https://github.com/REZ3X"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                github.com/REZ3X
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/rejaka-me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline print:text-gray-600"
              >
                linkedin.com/in/rejaka-me
              </a>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Professional Summary
                </h2>
                <p className="text-gray-700 text-xs leading-relaxed">
                  <strong>Passionate Full Stack Developer</strong> specializing
                  in modern web technologies with proven track record in
                  competitive programming. Expert in <em>Next.js ecosystem</em>,
                  building scalable applications with API routes, MongoDB
                  integration, and advanced image processing.
                  <strong>Award-winning developer</strong> with leadership
                  experience, combining technical excellence with strong
                  organizational skills. Committed to delivering innovative
                  solutions and contributing to meaningful projects through
                  clean, efficient code.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Experience
                </h2>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Web Developer - Freelance
                        </h3>
                        <span className="text-xs text-gray-500">
                          Dec 2023 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Developed full-stack web applications using Next.js API
                      routes, MongoDB, and ImgKit for image processing
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Lead Full Stack Developer - Slaviors
                        </h3>
                        <span className="text-xs text-gray-500">
                          Oct 2024 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Leading development team in building web applications
                      with Next.js, API routes, and MongoDB stack
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Frontend Developer - PT.ITHO INDOSTOCK
                          (Apprenticeship)
                        </h3>
                        <span className="text-xs text-gray-500">
                          Jul 2024 - Dec 2024
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Focused on frontend development and gained practical
                      experience in enterprise web development standards
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Coordinator - Student Discipline Team, SMKN 2 Depok
                          Sleman
                        </h3>
                        <span className="text-xs text-gray-500">
                          Sep 2024 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Led team coordination activities and developed
                      leadership skills in organizational management
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Web Developer - Karyasija (Volunteer)
                        </h3>
                        <span className="text-xs text-gray-500">
                          Jun 2025 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Contributing to SMKN 2 Depok Sleman school website
                      development and maintaining codebase
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-xs">
                          Security Personnel (Volunteer) - Student Discipline
                          Team, SMKN 2 Depok Sleman
                        </h3>
                        <span className="text-xs text-gray-500">
                          Sep 2024 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">
                      • Volunteer security role supporting student discipline
                      and school safety initiatives
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Education
                </h2>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-xs">
                      System Information Network and Application Engineering
                      (SIJA)
                    </h3>
                    <p className="text-gray-600 text-xs">SMKN 2 Depok Sleman</p>
                  </div>
                  <span className="text-xs text-gray-500">2023 - 2027</span>
                </div>
              </section>
            </div>

            <div className="space-y-3">
              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Technical Skills
                </h2>
                <div className="text-xs text-gray-700 leading-relaxed">
                  <p className="mb-1">
                    <strong>Frontend:</strong> React.js, Next.js, TypeScript,
                    HTML5, CSS3, Tailwind CSS
                  </p>
                  <p className="mb-1">
                    <strong>Backend:</strong> Next.js API Routes, Node.js,
                    Serverless Functions
                  </p>
                  <p className="mb-1">
                    <strong>Database:</strong> MongoDB, MySQL
                  </p>
                  <p>
                    <strong>Tools:</strong> Git, VS Code, npm, Postman
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Achievements
                </h2>
                <div className="space-y-1">
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      Top 10 in Pemrograman ByProject Student Category Web Dev
                      Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Universitas Teknologi Yogyakarta - 2025
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      Finalist of Sagasitas Web Building Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Sagasitas Indonesia - 2024
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-xs">
                      1st Place of National Digital Hero Competition
                    </h3>
                    <p className="text-gray-600 text-xs">
                      PT.ITHO INDOSTOCK - 2024
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                  Languages
                </h2>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span>Indonesian</span>
                    <span className="text-gray-600">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Javanese</span>
                    <span className="text-gray-600">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>English</span>
                    <span className="text-gray-600">Intermediate</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-3 pt-2 border-t border-gray-200 text-center text-gray-500 text-xs">
            <p>
              Available for internship and entry-level opportunities •{" "}
              {currentDate && `Generated ${currentDate}`}
            </p>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          @page {
            size: A4;
            margin: 0.4in;
          }

          body {
            font-family: "Merriweather", "Times New Roman", serif !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: black !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          .p-6 {
            padding: 0 !important;
          }

          header {
            text-align: center !important;
            margin-bottom: 16px !important;
            padding-bottom: 8px !important;
            border-bottom: 1px solid #333 !important;
          }

          h1 {
            font-size: 22px !important;
            font-weight: bold !important;
            margin-bottom: 4px !important;
            color: black !important;
          }

          h2 {
            font-size: 14px !important;
            font-weight: bold !important;
            margin-bottom: 8px !important;
            padding-bottom: 3px !important;
            border-bottom: 1px solid #666 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            color: black !important;
          }

          h3 {
            font-size: 12px !important;
            font-weight: 600 !important;
            margin-bottom: 2px !important;
            color: black !important;
          }

          p {
            font-size: 12px !important;
            line-height: 1.4 !important;
            margin: 0 !important;
            color: black !important;
          }

          .text-2xl {
            font-size: 22px !important;
          }

          .text-sm {
            font-size: 12px !important;
          }

          .text-xs {
            font-size: 11px !important;
          }

          .grid {
            display: grid !important;
          }

          .grid-cols-1 {
            grid-template-columns: 1fr !important;
          }

          .lg\\:grid-cols-3 {
            grid-template-columns: 2.2fr 1fr !important;
          }

          .lg\\:col-span-2 {
            grid-column: span 1 !important;
          }

          .gap-4 {
            gap: 16px !important;
          }

          .space-y-3 > * + * {
            margin-top: 12px !important;
          }

          .space-y-1\\.5 > * + * {
            margin-top: 6px !important;
          }

          .space-y-1 > * + * {
            margin-top: 4px !important;
          }

          .space-y-0\\.5 > * + * {
            margin-top: 2px !important;
          }

          .mb-4 {
            margin-bottom: 12px !important;
          }

          .mb-3 {
            margin-bottom: 8px !important;
          }

          .mb-2 {
            margin-bottom: 6px !important;
          }

          .mb-1 {
            margin-bottom: 4px !important;
          }

          .mt-3 {
            margin-top: 8px !important;
          }

          .mt-1 {
            margin-top: 4px !important;
          }

          .mt-0\\.5 {
            margin-top: 2px !important;
          }

          .pb-3 {
            padding-bottom: 8px !important;
          }

          .pb-1 {
            padding-bottom: 4px !important;
          }

          .pt-2 {
            padding-top: 6px !important;
          }

          .flex {
            display: flex !important;
          }

          .flex-wrap {
            flex-wrap: wrap !important;
          }

          .justify-center {
            justify-content: center !important;
          }

          .justify-between {
            justify-content: space-between !important;
          }

          .items-start {
            align-items: flex-start !important;
          }

          .gap-3 {
            gap: 8px !important;
          }

          .text-center {
            text-align: center !important;
          }

          .font-bold {
            font-weight: bold !important;
          }

          .font-semibold {
            font-weight: 600 !important;
          }

          .font-medium {
            font-weight: 500 !important;
          }

          .uppercase {
            text-transform: uppercase !important;
          }

          .tracking-wide {
            letter-spacing: 0.3px !important;
          }

          .leading-relaxed {
            line-height: 1.4 !important;
          }

          .text-gray-800,
          .text-gray-700,
          .text-gray-600,
          .text-gray-500 {
            color: black !important;
          }

          a {
            color: black !important;
            text-decoration: none !important;
          }

          .border-b {
            border-bottom: 1px solid #333 !important;
          }

          .border-t {
            border-top: 1px solid #333 !important;
          }

          .border-gray-300,
          .border-gray-200 {
            border-color: #333 !important;
          }

          section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 10px !important;
          }

          footer {
            margin-top: 12px !important;
            padding-top: 6px !important;
            border-top: 1px solid #333 !important;
            text-align: center !important;
          }

          strong {
            font-weight: bold !important;
            color: black !important;
          }

          em {
            font-style: italic !important;
            color: black !important;
          }

          .space-y-1\\.5 > div {
            margin-bottom: 4px !important;
            padding: 2px 0 !important;
          }

          .space-y-1 > div {
            margin-bottom: 3px !important;
            padding: 1px 0 !important;
          }

          .text-xs.text-gray-700.leading-relaxed p {
            margin-bottom: 3px !important;
            line-height: 1.3 !important;
          }

          .space-y-0\\.5.text-xs > div {
            margin-bottom: 2px !important;
            padding: 1px 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default ResumePage;
