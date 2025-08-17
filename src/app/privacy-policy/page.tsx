"use client";
import React, { useState, useEffect } from "react";

const PrivacyPolicyPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900 font-resume">
        <div className="max-w-4xl mx-auto p-6 bg-white">
          <header className="text-center mb-4 pb-3 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              Rejaka Abimanyu Susanto | Website Developer Portfolio
            </p>
            <div className="text-xs text-gray-600">
              <p>Last updated: July 20, 2025</p>
            </div>
          </header>

          <div className="space-y-4">
            <section>
              <p className="text-gray-700 text-xs leading-relaxed mb-3">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>
              <p className="text-gray-700 text-xs leading-relaxed">
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy. This Privacy
                Policy has been created with the help of the{" "}
                <a
                  href="https://www.termsfeed.com/privacy-policy-generator/"
                  target="_blank"
                  className="text-gray-800 hover:underline print:text-gray-800"
                >
                  Privacy Policy Generator
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Interpretation and Definitions
              </h2>

              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-2">
                  Interpretation
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-800 mb-2">
                  Definitions
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed mb-2">
                  For the purposes of this Privacy Policy:
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Account:
                    </span>
                    <span className="text-gray-700">
                      A unique account created for You to access our Service or
                      parts of our Service.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Affiliate:
                    </span>
                    <span className="text-gray-700">
                      An entity that controls, is controlled by or is under
                      common control with a party, where &quot;control&quot;
                      means ownership of 50% or more of the shares, equity
                      interest or other securities entitled to vote for election
                      of directors or other managing authority.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Company:
                    </span>
                    <span className="text-gray-700">
                      Refers to Rejaka Abimanyu Susanto | Website Developer
                      Portfolio (referred to as either &quot;the Company&quot;,
                      &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                      Agreement).
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Cookies:
                    </span>
                    <span className="text-gray-700">
                      Small files that are placed on Your computer, mobile
                      device or any other device by a website, containing the
                      details of Your browsing history on that website among its
                      many uses.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Country:
                    </span>
                    <span className="text-gray-700">Refers to Indonesia.</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Device:
                    </span>
                    <span className="text-gray-700">
                      Any device that can access the Service such as a computer,
                      a cellphone or a digital tablet.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Personal Data:
                    </span>
                    <span className="text-gray-700">
                      Any information that relates to an identified or
                      identifiable individual.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Service:
                    </span>
                    <span className="text-gray-700">
                      Refers to the Website.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      Website:
                    </span>
                    <span className="text-gray-700">
                      Refers to Rejaka Abimanyu Susanto | Website Developer
                      Portfolio, accessible from{" "}
                      <a
                        href="https://rejaka.id"
                        rel="external nofollow noopener"
                        target="_blank"
                        className="text-gray-800 hover:underline print:text-gray-800"
                      >
                        https://rejaka.id
                      </a>
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-800 min-w-24">
                      You:
                    </span>
                    <span className="text-gray-700">
                      The individual accessing or using the Service, or the
                      company, or other legal entity on behalf of which such
                      individual is accessing or using the Service, as
                      applicable.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Collecting and Using Your Personal Data
              </h2>

              <div className="mb-3">
                <h3 className="text-xs font-semibold text-gray-800 mb-2">
                  Types of Data Collected
                </h3>

                <div className="mb-2">
                  <h4 className="text-xs font-medium text-gray-800 mb-1">
                    Personal Data
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed mb-1">
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                  </p>
                  <div className="text-xs text-gray-700 ml-3">
                    <p>• Email address</p>
                    <p>• First name and last name</p>
                    <p>• Usage Data</p>
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="text-xs font-medium text-gray-800 mb-1">
                    Usage Data
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed mb-1">
                    Usage Data is collected automatically when using the
                    Service. Usage Data may include information such as Your
                    Device&apos;s Internet Protocol address (e.g. IP address),
                    browser type, browser version, the pages of our Service that
                    You visit, the time and date of Your visit, the time spent
                    on those pages, unique device identifiers and other
                    diagnostic data.
                  </p>
                </div>

                <div className="mb-2">
                  <h4 className="text-xs font-medium text-gray-800 mb-1">
                    Third-Party Social Media Services
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed mb-1">
                    The Company allows You to create an account and log in to
                    use the Service through the following Third-party Social
                    Media Services: Google, Github, and Discord.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-gray-800 mb-1">
                    Tracking Technologies and Cookies
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed mb-1">
                    We use Cookies and similar tracking technologies to track
                    the activity on Our Service and store certain information.
                    The technologies We use include Cookies or Browser Cookies
                    and Web Beacons.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Use of Your Personal Data
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                The Company may use Personal Data for the following purposes:
              </p>
              <div className="text-xs text-gray-700 ml-3 space-y-1">
                <p>
                  • <strong>To provide and maintain our Service</strong>,
                  including to monitor the usage of our Service
                </p>
                <p>
                  • <strong>To manage Your Account</strong> as a user of the
                  Service
                </p>
                <p>
                  • <strong>For the performance of a contract</strong> for
                  products, items or services purchased through the Service
                </p>
                <p>
                  • <strong>To contact You</strong> by email, telephone calls,
                  SMS, or other equivalent forms of electronic communication
                </p>
                <p>
                  • <strong>To provide You</strong> with news, special offers
                  and general information about similar goods and services
                </p>
                <p>
                  • <strong>To manage Your requests</strong> to Us
                </p>
                <p>
                  • <strong>For business transfers</strong> in case of merger,
                  divestiture, restructuring, or similar proceedings
                </p>
                <p>
                  • <strong>For other purposes</strong> such as data analysis,
                  identifying usage trends, and improving our Service
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Data Retention and Transfer
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to comply with our legal
                obligations, resolve disputes, and enforce our legal agreements
                and policies.
              </p>
              <p className="text-gray-700 text-xs leading-relaxed">
                Your information, including Personal Data, may be transferred to
                and maintained on computers located outside of Your jurisdiction
                where data protection laws may differ. Your consent to this
                Privacy Policy followed by Your submission of such information
                represents Your agreement to that transfer.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Data Security and Disclosure
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                The security of Your Personal Data is important to Us, but no
                method of transmission over the Internet or electronic storage
                is 100% secure. While We strive to use commercially acceptable
                means to protect Your Personal Data, We cannot guarantee its
                absolute security.
              </p>
              <p className="text-gray-700 text-xs leading-relaxed">
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required by law or in response to
                valid requests by public authorities (e.g. a court or government
                agency).
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Your Rights and Controls
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                You have the right to delete or request that We assist in
                deleting the Personal Data that We have collected about You. Our
                Service may give You the ability to delete certain information
                about You from within the Service.
              </p>
              <p className="text-gray-700 text-xs leading-relaxed">
                You may update, amend, or delete Your information at any time by
                signing in to Your Account and visiting the account settings
                section, or by contacting Us directly.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed">
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Links to Other Websites
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed">
                Our Service may contain links to other websites that are not
                operated by Us. We strongly advise You to review the Privacy
                Policy of every site You visit. We have no control over and
                assume no responsibility for the content, privacy policies or
                practices of any third party sites or services.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date at the
                top of this Privacy Policy.
              </p>
              <p className="text-gray-700 text-xs leading-relaxed">
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Contact Information
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-2">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <div className="text-xs text-gray-700">
                <p className="mb-1">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:abim@rejaka.id"
                    className="text-gray-800 hover:underline print:text-gray-800"
                  >
                    abim@rejaka.id
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+6282141884664"
                    className="text-gray-800 hover:underline print:text-gray-800"
                  >
                    +62 821 4188 4664
                  </a>
                </p>
              </div>
            </section>
          </div>

          <footer className="mt-4 pt-3 border-t border-gray-200 text-center text-gray-500 text-xs">
            <p>
              This Privacy Policy is effective as of July 20, 2025 •{" "}
              {currentDate && `Accessed ${currentDate}`}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
