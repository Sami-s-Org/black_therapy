import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import MianSlider from "../../Components/MianSlider";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeSlider from "../../Components/HomeSilder";
import Testimonials from "../../Components/Testimonial";
import AuthModal from "../../Components/ModelAuth";
import bgImage from "../../assets/wmremove-transformed.jpeg";
import Reverence from "../../assets/wmremove-transformed111.jpeg";
import Apply from "../../assets/DeWatermark.ai_1745345508366.png";
import Support from "../../assets/757b6fea-2487-4fd0-9a62-a4baec514e7b.jpeg";
import Therapist from "../../assets/dfb58278-4ea5-44e3-bbfd-79dc456ff3b8.jpeg";

const boxVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};
const cards = [
  {
    title: "Find a Therapist",
    desc: "Use our directory to find the right therapist or coach for your needs.",
    image:
      "https://media.istockphoto.com/id/1329038035/photo/psychological-counselling-black-male-patient-with-depression-having-session-with.jpg?s=612x612&w=0&k=20&c=3JNZsAhwNlEuDmxSaUZL_8cK26PECyob5Fv-ZKtBo98=",
    button: "Find Now",
  },
  {
    title: "Free Help",
    desc: "Apply for sponsored therapy sessions, thanks to our donors.",
    image:
      "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v2/DQTVFL3D7ZCSDEE2HNGOOY7T3I.jpg?auth=492ba5b949629887ff5935861ac3dc3d0de35d3d33a0396c462dc7c051e4b983&width=1440",
    button: "Apply",
  },
  {
    title: "Join as a Therapist",
    desc: "Grow your online presence by joining our directory.",
    image: Therapist,
    button: "Join Us",
  },
  {
    title: "Support Us",
    desc: "Help Black men & boys access therapy by donating.",
    image: Support,

    button: "Donate",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}

      <MianSlider />
      <section className={styles.heroContainer}>
        <div className={styles.banner2}>
          <div className={styles.overlay}>
            <div className={styles.quote}>
              “We see you. We hear you. We’re here for you.”
            </div>
            <p className={styles.overlayText}>
              "Even in brokenness, light reaches us. Healing is not far—it lives
              within the reach of grace."
            </p>

            <div className={styles.buttons}>
              <button onClick={() => setIsModalOpen(true)}>
                Find a Therapist
              </button>
              <button onClick={() => setIsModalOpen(true)}>Find a Coach</button>
            </div>
          </div>
        </div>
      </section>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div className={styles.wrapper}>
          <div className={styles.container333}>
            {["Healing", "Growth", "Strength", "Community"].map(
              (title, index) => (
                <motion.div
                  key={title}
                  className={styles.box}
                  variants={boxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <h2 className={styles.big}>{title}</h2>
                  <p className={styles.small}>
                    {
                      [
                        "Starts with Support",
                        "Guided by Experts",
                        "In Vulnerability",
                        "You're Not Alone",
                      ][index]
                    }
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.fff}>
        <div className={styles.section}>
          <div className={styles.containercardd}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className={styles.card}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.imageff}
                />
                <div className={styles.textContent}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <button>{card.button}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.ffffqq}>
        <div className={styles.wrapper}>
          <div className={styles.quoteSection}>
            <p className={styles.quote}>
              We see you. We hear you. We’re here for you.
            </p>
          </div>

          <div className={styles.banner}>
            <img
              src={bgImage}
              alt="African American man feeling the light"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <p className={styles.brokenness}>
                Even in brokenness, light reaches us. Healing is not far—it
                lives within the reach of grace.
              </p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => setIsModalOpen(true)} className={styles.btn}>
              Find a Therapist
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.btnOutline}
            >
              Find a Coach
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.safeSpaceSection}>
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <img
                src={Reverence}
                alt="Reverence and Surrender"
                className={styles.image}
              />
              <div className={styles.overlayQuote}>
                <em>
                  "Here, you are not just heard—you are held. You are not just
                  seen—you are known."
                </em>
              </div>
            </div>
            <div className={styles.textWrapper}>
              <h2>A Safe Space, Always</h2>
              <p>
                At Therapy for Black Men, we are more than a platform—we are a
                sanctuary for your voice and your healing. Here, you will find a
                judgment-free zone where you can lay down your burdens and speak
                your heart without fear.
              </p>
              <p>
                We are built on the principles of compassion, empathy, honor,
                and respect, ensuring that every interaction uplifts and
                empowers you. Your experiences, your pain, your triumphs—they
                all matter deeply to us.
              </p>{" "}
              <button
                style={{ marginTop: "24px", width: "180px" }}
                className={styles.btn}
              >
                Conatct Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.supportSection}>
        <div className={styles.containermmm}>
          <h2 className={styles.headingsss}>Support Options</h2>
          <p className={styles.subheading}>
            Are you seeking support for yourself or a loved one?
          </p>
          <h3 className={styles.title}>
            Find the Right Support for You or a Loved One
          </h3>

          <ul className={styles.supportList}>
            <li>
              <Link to="/specialties/individual-therapy">
                Individual Therapy:
              </Link>{" "}
              Personalized one-on-one care.
            </li>
            <li>
              <Link to="/specialties/couples-therapy">Couples Therapy:</Link>{" "}
              Strengthen your bond through guided sessions.
            </li>
            <li>
              <Link to="/specialties/family-therapy">Family Therapy:</Link>{" "}
              Foster healthier communication and dynamics.
            </li>
            <li>
              <Link to="/specialties/child-adolescent">
                Child & Adolescent Support:
              </Link>{" "}
              Specialized care for youth.
            </li>
            <li>
              <Link to="/specialties/group-therapy">Group Therapy:</Link> Heal
              together through shared experiences.
            </li>
            <li>
              <Link to="/specialties/faith-based">Faith-Based Therapy:</Link>{" "}
              Spiritually centered support for those seeking a faith-driven
              approach.
            </li>
            <li>
              <Link to="/specialties/trauma-informed">
                Trauma-Informed Therapy:
              </Link>{" "}
              Compassionate, trauma-sensitive care.
            </li>
            <li>
              <Link to="/coaches">Coaching:</Link> Guidance toward personal
              growth and success.
            </li>
          </ul>

          <p className={styles.closing}>
            Taking the first step toward healing can feel daunting, but you’re
            not alone. Let us walk with you.
          </p>

          <button className={styles.ctaButton}>
            Take the first step toward wholeness today.
          </button>
        </div>
      </div>
      <div style={{ backgroundColor: "#f3f3f3" }}>
        <div className={styles.wrapper}>
          <p className={styles.headingsss}>Featured Therapists</p>
          <HomeSlider />{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centerss",
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.Findbtn}
            >
              Find A Therapists
            </button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#f3f3f3" }}>
        <div className={styles.wrapper}>
          <p className={styles.headingsss}>Featured Coaches</p>
          <HomeSlider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centerss",
            }}
          >
            <button className={styles.Findbtn}>Find A Coach</button>
          </div>
        </div>
      </div>
      <Testimonials />
    </>
  );
}
