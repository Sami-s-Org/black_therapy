import { useEffect } from 'react'
import styles from './store.module.css'

export default function Store() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className={styles.storeContainer}>
      <div className={styles.banner}>
        <video autoPlay loop muted playsInline className={styles.bannerVideo}>
          <source
            src="https://media.istockphoto.com/id/469267480/video/happy-healthy-athlete-appeciating-the-sun-while-on-a-run.mp4?s=mp4-640x640-is&k=20&c=UzM-ooJS19rJbSAvszJ5BTmZS2R80qaVzxyvw9jCwL0="
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className={styles.videoOverlay}></div>

        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>What you wear can tell the story of hope.</h1>
          <p className={styles.bannerSubtitle}>
            Every piece in our collection was designed with intention to reflect the strength, healing, and dignity of
            Black men on their journey toward wholeness. Whether you're a brother in healing or a supporter standing in
            the gap, your purchase helps us provide life-changing, free therapy to those in need.
          </p>
          <button className={styles.ctaButton}>🛒 Shop Now | Support the Mission</button>
        </div>
      </div>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>✨ Featured Collections</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Healing Is Revolutionary</h3>
            <p>T-shirts, hoodies, and hats.</p>
            <span className={styles.affirmation}>“This isn’t just a hoodie. It’s a statement: I chose healing.”</span>
          </div>

          <div className={styles.card}>
            <h3>Kings Are Healing</h3>
            <p>Graphic apparel & accessories.</p>
            <span className={styles.affirmation}>“This t-shirt helped sponsor therapy for a brother in need.”</span>
          </div>

          <div className={styles.card}>
            <h3>Faith. Healing. Wholeness.</h3>
            <p>Devotional & journal bundles.</p>
            <span className={styles.affirmation}>“Writing my truth is part of my healing.”</span>
          </div>

          <div className={styles.card}>
            <h3>For the Little Kings</h3>
            <p>Youth wear for Black boys.</p>
            <span className={styles.affirmation}>“He wears love. He walks in worth.”</span>
          </div>
        </div>
      </section>
      <section className={styles.impactSection}>
        <h2 className={styles.impactTitle}>💛 Your Purchase = Real Healing</h2>
        <p className={styles.impactText}>
          When you shop with us, you help provide free therapy sessions to Black men and boys across the country. To
          date, your support has funded over $150,000 in free mental health care.
        </p>
        <p className={styles.impactText}>
          Every item you wear is a declaration that Black men deserve peace, support, and a space to heal.
        </p>
      </section>
    </div>
  )
}
