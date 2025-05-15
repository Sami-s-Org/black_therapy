import React, { useEffect } from "react";
import styles from "./termused.module.css";
import HeaderBar from "../../../Components/Headbar";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <HeaderBar heading="Term Of Used" />
      <div className={styles.termsContainer}>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Therapy for Black Men’s website, services, or
            resources, you agree to these Terms of Use. If you do not agree,
            please do not use this website.
          </p>
        </section>

        <section>
          <h2>2. Mission & Use</h2>
          <p>
            Therapy for Black Men provides mental health resources, therapist
            and coach directories, and educational content to support the
            healing of Black men and boys. Use of our services should always
            align with this mission.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <ul>
            <li>
              You must be at least 18 years old or have guardian consent to use
              our services.
            </li>
            <li>
              You agree to provide accurate information during any application
              or sign-up process.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of any
              login credentials.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Content Disclaimer</h2>
          <p>
            The information provided on this website is not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            help from a licensed healthcare provider for mental health concerns.
          </p>
        </section>

        <section>
          <h2>5. Therapist & Coach Listings</h2>
          <p>
            We carefully review therapist and coach profiles before approval.
            However, we do not guarantee any outcomes from therapy or coaching
            services accessed through our platform.
          </p>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            All content on this site—including logos, text, images, and
            videos—is the property of Therapy for Black Men unless otherwise
            noted. You may not copy, modify, or redistribute any materials
            without written permission.
          </p>
        </section>

        <section>
          <h2>7. Prohibited Conduct</h2>
          <ul>
            <li>
              No harassment, hate speech, or discriminatory behavior is
              tolerated.
            </li>
            <li>No impersonation, false information, or spam submissions.</li>
            <li>No interference with the site’s infrastructure or security.</li>
          </ul>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time. Changes will be posted on
            this page with an updated date. Continued use of the site after
            changes implies acceptance.
          </p>
        </section>

        <section>
          <h2>9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access for users who
            violate these Terms.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, please
            contact us at{" "}
            <a href="mailto:info@therapyforblackmen.org">
              info@therapyforblackmen.org
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsOfUse;
