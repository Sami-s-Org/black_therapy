import { useEffect, useState } from 'react'
import styles from './home.module.css'
import MianSlider from '../../Components/MianSlider'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeSlider from '../../Components/HomeSilder'
import Testimonials from '../../Components/Testimonial'
import AuthModal from '../../Components/ModelAuth'
import Reverence from '../../assets/wmremove-transformed111.jpeg'
import Support from '../../assets/757b6fea-2487-4fd0-9a62-a4baec514e7b.jpeg'
import Therapist from '../../assets/dfb58278-4ea5-44e3-bbfd-79dc456ff3b8.jpeg'

// Standardized animation variants
const standardTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1], // matches CSS cubic-bezier
}

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: standardTransition,
  },
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
}

const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ...standardTransition,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const staggerItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...standardTransition,
      delay: i * 0.1,
    },
  }),
}

// Service cards data
const cards = [
  {
    title: 'Find a Therapist',
    desc: 'Use our directory to find the right therapist or coach for your needs.',
    image:
      'https://media.istockphoto.com/id/1329038035/photo/psychological-counselling-black-male-patient-with-depression-having-session-with.jpg?s=612x612&w=0&k=20&c=3JNZsAhwNlEuDmxSaUZL_8cK26PECyob5Fv-ZKtBo98=',
    button: 'Find Now',
  },
  {
    title: 'Free Help',
    desc: 'Apply for sponsored therapy sessions, thanks to our donors.',
    image:
      'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v2/DQTVFL3D7ZCSDEE2HNGOOY7T3I.jpg?auth=492ba5b949629887ff5935861ac3dc3d0de35d3d33a0396c462dc7c051e4b983&width=1440',
    button: 'Apply',
  },
  {
    title: 'Join as a Therapist',
    desc: 'Grow your online presence by joining our directory.',
    image: Therapist,
    button: 'Join Us',
  },
  {
    title: 'Support Us',
    desc: 'Help Black men & boys access therapy by donating.',
    image: Support,
    button: 'Donate',
  },
]

// Support options data
const supportOptions = [
  { title: 'Individual Therapy', link: '/specialties/individual-therapy', desc: 'Personalized one-on-one care.' },
  {
    title: 'Couples Therapy',
    link: '/specialties/couples-therapy',
    desc: 'Strengthen your bond through guided sessions.',
  },
  {
    title: 'Family Therapy',
    link: '/specialties/family-therapy',
    desc: 'Foster healthier communication and dynamics.',
  },
  { title: 'Child & Adolescent Support', link: '/specialties/child-adolescent', desc: 'Specialized care for youth.' },
  { title: 'Group Therapy', link: '/specialties/group-therapy', desc: 'Heal together through shared experiences.' },
  {
    title: 'Faith-Based Therapy',
    link: '/specialties/faith-based',
    desc: 'Spiritually centered support for those seeking a faith-driven approach.',
  },
  {
    title: 'Trauma-Informed Therapy',
    link: '/specialties/trauma-informed',
    desc: 'Compassionate, trauma-sensitive care.',
  },
  { title: 'Coaching', link: '/coaches', desc: 'Guidance toward personal growth and success.' },
]

// Values data
const values = [
  ['Healing', 'Starts with Support'],
  ['Growth', 'Guided by Experts'],
  ['Strength', 'In Vulnerability'],
  ['Community', "You're Not Alone"],
]

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}

      {/* Main Slider/Banner */}
      <section className={styles.mainSlider}>
        <MianSlider />
      </section>

      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={styles.banner2}>
          <div className={styles.overlay}>
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" transition={{ duration: 0.8 }}>
              <div className={styles.quote}>"We see you. We hear you. We're here for you."</div>
              <p className={styles.overlayText}>
                "Even in brokenness, light reaches us. Healing is not far—it lives within the reach of grace."
              </p>
            </motion.div>

            <div className={styles.buttons}>
              <motion.button
                onClick={() => setShowModal(true)}
                className={styles.primaryButton}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Find a Therapist
              </motion.button>
              <motion.button
                onClick={() => setShowModal(true)}
                className={styles.primaryButton}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Find a Coach
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection} style={{ backgroundColor: '#f8f7f5' }}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionHeading}>Our Values</h2>
            <div className={styles.decorativeLine}></div>
          </motion.div>

          <div className={styles.valueContainer}>
            {values.map(([title, desc], index) => (
              <motion.div
                key={title}
                className={styles.valueBox}
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <h2 className={styles.valueTitle}>{title}</h2>
                <p className={styles.valueDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Service Cards Section */}
      <section className={styles.cardsSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionHeading}>Our Services</h2>
            <div className={styles.decorativeLine}></div>
          </motion.div>

          <div className={styles.cardGrid}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className={styles.card}
                custom={idx}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <img src={card.image} alt={card.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <button>{card.button}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Quote Banner Section */}
      <section className={styles.quoteBannerSection}>
        <div className={styles.quoteBanner}>
          <div className={styles.quoteBannerOverlay}>
            <motion.p
              className={styles.quoteBannerText}
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              Even in brokenness, light reaches us. Healing is not far—it lives within the reach of grace.
            </motion.p>

            <div className={styles.bannerButtonGroup}>
              <motion.button
                onClick={() => setShowModal(true)}
                className={styles.bannerPrimaryButton}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Find a Therapist
              </motion.button>
              <motion.button
                onClick={() => setShowModal(true)}
                className={styles.bannerSecondaryButton}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Find a Coach
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Space Section */}
      <section className={styles.safeSpaceSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.safeSpaceContent}>
          <motion.div
            className={styles.imageWrapper}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <img src={Reverence} alt="Reverence and Surrender" className={styles.safeSpaceImage} />
            <div className={styles.overlayQuote}>
              <em>"Here, you are not just heard—you are held. You are not just seen—you are known."</em>
            </div>
          </motion.div>

          <motion.div
            className={styles.textWrapper}
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 variants={staggerItemVariant}>A Safe Space, Always</motion.h2>
            <motion.p variants={staggerItemVariant}>
              At Therapy for Black Men, we are more than a platform—we are a sanctuary for your voice and your healing.
              Here, you will find a judgment-free zone where you can lay down your burdens and speak your heart without
              fear.
            </motion.p>
            <motion.p variants={staggerItemVariant}>
              We are built on the principles of compassion, empathy, honor, and respect, ensuring that every interaction
              uplifts and empowers you. Your experiences, your pain, your triumphs—they all matter deeply to us.
            </motion.p>
            <motion.button
              variants={staggerItemVariant}
              className={styles.primaryButton}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Support Options Section */}
      <section className={styles.supportSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.supportContainer}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionHeading}>Support Options</h2>
            <div className={styles.decorativeLine}></div>
            <motion.p
              className={styles.sectionSubheading}
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              Are you seeking support for yourself or a loved one?
            </motion.p>
          </motion.div>

          <ul className={styles.supportList}>
            {supportOptions.map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Link to={item.link}>{item.title}</Link>
                {item.desc}
              </motion.li>
            ))}
          </ul>

          <motion.p
            className={styles.closing}
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3 }}
          >
            Taking the first step toward healing can feel daunting, but you're not alone. Let us walk with you.
          </motion.p>

          <motion.button
            className={styles.ctaButton}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            Take the first step toward wholeness today
          </motion.button>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Featured Therapists Section */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionHeading}>Featured Therapists</h2>
            <div className={styles.decorativeLine}></div>
          </motion.div>

          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
          >
            <HomeSlider />
          </motion.div>

          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              className={styles.ctaButton}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Find A Therapist
            </motion.button>
          </motion.div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Featured Coaches Section */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionHeading}>Featured Coaches</h2>
            <div className={styles.decorativeLine}></div>
          </motion.div>

          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
          >
            <HomeSlider />
          </motion.div>

          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              className={styles.ctaButton}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Find A Coach
            </motion.button>
          </motion.div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
          >
            <Testimonials />
          </motion.div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>
    </>
  )
}
