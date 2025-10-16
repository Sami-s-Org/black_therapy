import { useState } from 'react'
import styles from './home.module.css'
import MianSlider from '../../Components/MianSlider'
import { Link, useNavigate } from 'react-router-dom'
import { motion, Transition, Variants } from 'framer-motion'
import HomeSlider from '../../Components/HomeSilder'
import AuthModal from '../../Components/ModelAuth'
import Reverence from '../../assets/wmremove-transformed111.jpeg'
import Support from '../../assets/757b6fea-2487-4fd0-9a62-a4baec514e7b.jpeg'
import Therapist from '../../assets/dfb58278-4ea5-44e3-bbfd-79dc456ff3b8.jpeg'
import Avatar from '../../assets/IMG_1518-1-1-1-644x1024.jpg'
import Testimonials from '../../Components/Testimonial'

const standardTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
}

const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: standardTransition,
  },
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
}

const staggerContainerVariant: Variants = {
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

const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
}

const cardVariant: Variants = {
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
    link: '/findTherapist',
  },
  {
    title: 'Free Help',
    desc: 'Apply for sponsored therapy sessions, thanks to our donors.',
    image: 'https://t3.ftcdn.net/jpg/03/38/55/48/360_F_338554860_bZNpmpwOqfJp1YG4Q9B1ckrLYyFlPhCr.jpg',
    button: 'Apply',
    link: '/FreeTherapy',
  },
  {
    title: 'Join as a Therapist',
    desc: 'Grow your online presence by joining our directory.',
    image: Therapist,
    button: 'Join Us',
    link: '/joinAsATherapist',
  },
  {
    title: 'Support Us',
    desc: 'Help Black men & boys access therapy by donating.',
    image: Support,
    button: 'Donate',
    link: '#',
  },
]

// Support options data
const supportOptions = [
  { title: 'Individual Therapy', link: '/findTherapist', desc: 'Personalized one-on-one care.' },
  {
    title: 'Couples Therapy',
    link: '/findTherapist',
    desc: 'Strengthen your bond through guided sessions.',
  },
  {
    title: 'Family Therapy',
    link: '/findTherapist',
    desc: 'Foster healthier communication and dynamics.',
  },
  { title: 'Child & Adolescent Support', link: '/findTherapist', desc: 'Specialized care for youth.' },
  { title: 'Group Therapy', link: '/findTherapist', desc: 'Heal together through shared experiences.' },
  {
    title: 'Faith-Based Therapy',
    link: '/findTherapist',
    desc: 'Spiritually centered support for those seeking a faith-driven approach.',
  },
  {
    title: 'Trauma-Informed Therapy',
    link: '/findTherapist',
    desc: 'Compassionate, trauma-sensitive care.',
  },
  { title: 'Coaching', link: '/findCoach', desc: 'Guidance toward personal growth and success.' },
  {
    title: 'Grief & Loss Support',
    link: '/findTherapist',
    desc: 'Gentle guidance to help you navigate sorrow, honor your losses, and move toward hope and restoration',
  },
]

// Values data
// const values = [
//   ['Healing', 'Starts with Support'],
//   ['Growth', 'Guided by Experts'],
//   ['Strength', 'In Vulnerability'],
//   ['Community', "You're Not Alone"],
// ]
const Therapistss = [
  {
    imageUrl: Avatar,
    Heading: 'Therapist 1',
  },
  {
    imageUrl: Avatar,
    Heading: 'Therapist 2',
  },
  {
    imageUrl: Avatar,
    Heading: 'Therapist 3',
  },
  {
    imageUrl: Avatar,
    Heading: 'Therapist 4',
  },
  {
    imageUrl: Avatar,
    Heading: 'Therapist 5',
  },
]
const Coaches = [
  {
    imageUrl: Avatar,
    Heading: 'Coache 1',
  },
  {
    imageUrl: Avatar,
    Heading: 'Coache 2',
  },
  {
    imageUrl: Avatar,
    Heading: 'Coache 3',
  },
  {
    imageUrl: Avatar,
    Heading: 'Coache 4',
  },
  {
    imageUrl: Avatar,
    Heading: 'Coache 5',
  },
]
export default function Home() {
  const [showModal, setShowModal] = useState(false)

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])
  const navigate = useNavigate()
  const handleGotoTerapist = () => {
    navigate('/findTherapist')
  }
  // const handleGotoCoaches = () => {
  //   navigate('/findCoach')
  // }
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
              <div className={styles.quote}>
                "We see you.
                <br /> We hear you.
                <br /> We're here for you."
              </div>
              <p className={styles.overlayText}>
                "Even in brokenness, light reaches us. Healing is not far, it lives within the reach of grace"
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
      {/* numbers section */}
      <section className={styles.numbersSection}>
        <div className={styles.sectionShape}></div>
        <div className={styles.wrapper}>
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className={styles.sectionHeading}>The Need for Therapy Access for Black Men and Boys</p>
          </motion.div>

          <motion.div
            className={styles.cardWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, staggerChildren: 0.2 },
              },
            }}
          >
            {[
              {
                number: '1 in 3',
                text: 'Black men who need mental health support will never receive it due to cost, stigma, and accessibility issues.',
              },
              {
                number: '63%',
                text: 'of Black men believe that discussing mental health is seen as a sign of weakness in their communities.',
              },
              {
                number: '4%',
                text: 'Only 4% of U.S. therapists are Black, making culturally competent care difficult to find.',
              },
              {
                number: '20%',
                text: 'Black men are 20% more likely to experience major depression but are significantly less likely to receive care.',
              },
              {
                number: '78%',
                text: 'Suicide rates among Black youth have risen by 78% in the last two decades.',
              },
            ].map((fact, index) => (
              <motion.div
                key={index}
                className={styles.factCard}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.factNumber}>{fact.number}</div>
                <div className={styles.factText}>{fact.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>
      {/* Values Section */}
      {/* <section className={styles.valuesSection} style={{ backgroundColor: '#f8f7f5' }}>
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
      </section> */}
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
                  <button onClick={() => navigate(card.link)}>{card.button}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className={styles.sectionShape}></div>
      </section>
      {/* Quote Banner Section */}
      {/* <section className={styles.quoteBannerSection}>
        <div className={styles.quoteBanner}>
          <div className={styles.quoteBannerOverlay}>
            <motion.p
              className={styles.quoteBannerText}
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              Even in brokenness, light reaches us. Healing is not far it lives within the reach of grace.
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
      </section> */}
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
              <em>"Here, you are not just heard you are held. You are not just seen you are known."</em>
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
            <motion.p variants={staggerItemVariant} style={{ fontSize: '16px' }}>
              At Therapy for Black Men, we are more than a platform we are a sanctuary for your voice and your healing.
              Here, you will find a judgment-free zone where you can lay down your burdens and speak your heart without
              fear.
            </motion.p>
            <motion.p variants={staggerItemVariant} style={{ fontSize: '16px' }}>
              We are built on the principles of compassion, empathy, honor, and respect, ensuring that every interaction
              uplifts and empowers you. Your experiences, your pain, your triumphs they all matter deeply to us.
            </motion.p>
            <motion.button
              variants={staggerItemVariant}
              className={styles.primaryButton}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onClick={() => navigate('/contactUs')}
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
            <HomeSlider sliderItems={Therapistss} />
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
              onClick={handleGotoTerapist}
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
            <HomeSlider sliderItems={Coaches} />
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
              // onClick={handleGotoCoaches}
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
      <Testimonials />
    </>
  )
}
