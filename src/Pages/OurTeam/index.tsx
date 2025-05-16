import { useEffect } from 'react'
import styles from './ourteam.module.css'
import HeaderBar from '../../Components/Headbar'
import { IoMailOutline } from 'react-icons/io5'
import Vladimire from '../../assets/Vladimire.jpg'
import Benjamin from '../../assets/Benjamin.jpg'
import Sacheen from '../../assets/Sacheen.jpg'
import Sabrina from '../../assets/Sahrina.jpg'

export default function OurTeam() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <>
        <HeaderBar heading="Meet Our Team" />
        <div className={styles.wrapper}>
          <section className={styles.memberSection}>
            <div className={styles.inner}>
              <div className={styles.flx}>
                <div className={styles.imageContainer}>
                  <img src={Benjamin} alt="Benjamin" />
                </div>
                <div className={styles.textContainer}>
                  <h2>Benjamin Calixte</h2>
                  <h3>Founder of Therapy for Black Men</h3>
                  <p>
                    "Our team is committed to helping improve our men's overall well-being and mental health as well as
                    preventing the suffering that occurs when wounds are unaddressed. Our boys and men deserve better."
                    <br /> <p className={styles.auther}>— Benjamin Calixte</p>
                  </p>{' '}
                  <br />
                  <div className={styles.email}>
                    <IoMailOutline className={styles.icon} />
                    <a href="mailto:BenjaminCalixte@therapyforblackmen.org" className={styles.emailLink}>
                      BenjaminCalixte@therapyforblackmen.org
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.dfff}>
                <h3>Why Therapy for Black Men Matters</h3>
                <p>
                  My greatest joy in life was being a stay-at-home dad. That role, rooted in love and service, taught me
                  the profound importance of presence, connection, and intentional impact. It shaped my understanding of
                  what it truly means to nurture potential and inspired me to extend that care beyond my own family
                </p>
                <p>
                  My father instilled in my brothers and me a passion for sports—a foundation that introduced me to
                  discipline, resilience, and teamwork. Whether it was basketball, football, baseball, or track, these
                  experiences fueled my growth and became a cornerstone of my identity. Coaching naturally followed,
                  allowing me to guide others toward their best selves.
                </p>
                <p>
                  Through fatherhood and coaching, I witnessed firsthand the transformative power of genuine support in
                  shaping mental and emotional well-being. This realization became my calling: to create a space where
                  Black men could find the care and guidance they need to thrive. Together with my wife, Vladimire, we
                  built TherapyForBlackMen.org—a platform to educate, inspire, and empower Black men every single day.
                </p>
                <h3>Championing Mental Wellness for Black Men</h3>
                <p>
                  As a certified professional coach and New York University-trained life and executive coach, I approach
                  health and wellness holistically. My professional journey includes 17 years in customer relations and
                  8 years in managerial roles, blending hands-on experience with a deep commitment to advocacy and
                  empowerment.
                </p>
                <p>
                  With a Bachelor of Science degree in Psychology from Brooklyn College, I have spent my career
                  equipping individuals with the tools to achieve personal and professional growth. Through Therapy for
                  Black Men, I am driven to eliminate barriers that prevent Black men from accessing mental health
                  resources.
                </p>
                <p>
                  Our directory provides free therapy sessions with qualified professionals and connects men to
                  culturally resonant support. By bridging the gap between need and access, we strive to ensure that
                  Black men and boys have the resources they deserve.
                </p>
                <h3>A Voice for Change</h3>
                <p>
                  In addition to our direct services, I am deeply committed to raising awareness of the systemic issues
                  affecting Black men. From unconscious bias and inclusion to the empathy gap and societal perceptions,
                  I speak at organizations such as Walmart and the Congressional Black Caucus to address these
                  challenges and foster change.
                </p>
                <p>
                  I also serve as a Couples Coach, focusing on holistic approaches to relationships and guiding
                  individuals toward deeper connections.
                </p>
                <h3>A Life Rooted in Love and Purpose</h3>
                <p>
                  When I’m not coaching or advocating, you’ll often find me reading, writing, or coaching my children in
                  track and field. I’m proud to have been married to my incredible wife, Vladimire, for 20 years, and
                  together we’ve built a family centered on love and growth.
                </p>
                <h3>Why This Work Matters</h3>
                <p>
                  Our mission is simple but vital: to improve the mental health and overall well-being of Black men and
                  boys, breaking the cycles of unaddressed wounds and generational pain. We are here to say that Black
                  men deserve better—because healing isn’t just an option, it’s a right.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.memberSection}>
            <div className={styles.inner}>
              <div className={styles.flx}>
                <div className={styles.imageContainer}>
                  <img src={Vladimire} alt="Vladimire Calixte" />
                </div>
                <div className={styles.textContainer}>
                  <h2>Vladimire Calixte</h2>
                  <h3>Founder of Therapy for Black Men</h3>
                  <p>
                    "Your healing matters because healing is a destiny decision."
                    <br />
                    <p className={styles.auther}>— Vladimire Calixte</p>
                  </p>
                  <br />

                  <div className={styles.email}>
                    <IoMailOutline className={styles.icon} />
                    <a href="mailto:VladimireCalixte@therapyforblackmen.org" className={styles.emailLink}>
                      VladimireCalixte@therapyforblackmen.org
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.dfff}>
                <p>
                  As a child growing up without a father in the household, I felt the weight of an immeasurable void.
                  Watching other children interact with their fathers was a painful reminder of the connection I yearned
                  for but never had. That early loss shaped me profoundly, instilling a deep understanding of how
                  unhealed wounds can affect every aspect of our lives.
                </p>
                <p>
                  Through my own personal struggles and two decades as a therapist, I’ve come to see a universal truth:
                  we’ve all carried the scars of trauma in some form. Yet, for Black men, the weight of societal
                  expectations often multiplies that pain. From the time they are boys, Black men are told to “be
                  strong,” “walk it off,” “don’t cry,” and “man up.” These harmful messages discourage vulnerability and
                  perpetuate silent suffering.
                </p>
                <p>I’m here to tell you: you’re not meant to go on your journey alone.</p>

                <h3>Why I Founded TherapyForBlackMen.org</h3>
                <p>
                  As a mother and wife, I witness the immeasurable power of a loving father and husband in shaping a
                  family. I see my husband, Benjamin, pouring his strength and care into our children every single day.
                  His presence shows me just how transformational healing and love can be.
                </p>
                <p>
                  As a therapist, I have the privilege of witnessing the courage Black men bring into the therapy space.
                  Each story they share is an act of bravery, a defiance of the harmful stereotypes that seek to silence
                  them. I started TherapyForBlackMen.org to create a sanctuary—a place where men of color could access
                  the tools, support, and community needed to reclaim their strength and rewrite their narratives.
                </p>

                <h3>About Vladimire Calixte</h3>
                <p>
                  I am proud to bring both lived experience and professional expertise to this mission. Over the last 20
                  years, I’ve worked with individuals, couples, and families from all walks of life—including
                  celebrities, politicians, and professional athletes—helping them overcome addiction, depression,
                  anxiety, trauma, and more.
                </p>
                <div className={styles.list}>
                  <ul>
                    <li>
                      <strong>Awards:</strong> Multiple recognitions for my work in mental health, relationships, and
                      personal empowerment.
                    </li>
                    <li>
                      <strong>Education:</strong> Bachelor’s degree in Sociology from Hunter College; Master’s degree in
                      Applied Psychology from New York University.
                    </li>
                  </ul>
                </div>
                <p>
                  Beyond my professional work, I find joy in the simple and meaningful moments: writing, singing,
                  cooking, dancing, and, most importantly, spending time with my family. I am a proud wife of 20 years
                  and mother to two incredible children who remind me every day of the importance of love and healing.
                </p>

                <h3>My Commitment to You</h3>
                <p>
                  Through TherapyForBlackMen.org, my mission is clear: to ensure that no Black man has to navigate his
                  healing journey alone. Together, we can challenge the myths, break the stigmas, and embrace the
                  truth—that strength is found in vulnerability, and healing is your birthright.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.memberSection}>
            <div className={styles.inner}>
              <div className={styles.flx}>
                <div className={styles.imageContainer}>
                  <img src={Sacheen} alt="Sacheen Sawney" />
                </div>
                <div className={styles.textContainer}>
                  <h2>Sacheen Sawney</h2>
                  <h3>Virtual Care Executive Manager</h3>
                  <p>
                    "Healing is a collective effort. Together, we can create a world where Black men feel seen,
                    supported, and empowered to thrive."
                    <br />
                    <p className={styles.auther}>— Sacheen Sawney</p>
                  </p>
                  <br />

                  <div className={styles.email}>
                    <IoMailOutline className={styles.icon} />
                    <a href="mailto:SacheenSawney@therapyforblackmen.org" className={styles.emailLink}>
                      SacheenSawney@therapyforblackmen.org
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.dfff}>
                <p>
                  Sacheen Sawney is a visionary leader and compassionate advocate whose life's work is centered on
                  uplifting communities and fostering wellness. As the Virtual Care Executive Manager at Therapy for
                  Black Men, she brings a wealth of experience in event production, community engagement, and mental
                  health advocacy to empower Black men on their healing journeys.
                </p>
                <p>
                  Sacheen’s professional path reflects her unwavering commitment to wellness and education. From her
                  impactful tenure at the American Museum of Natural History to her creative leadership at Mentoring Up,
                  she has consistently championed initiatives that create meaningful change.
                </p>
                <p>
                  Her work is deeply rooted in her Caribbean heritage, which fuels her passion for helping men of color
                  align with their greatness and achieve lasting well-being.
                </p>
                <p>
                  In 2021, Sacheen joined Spiked Spin Wellness Co. as General Manager, where she furthered their mission
                  of fostering generational health in communities of color. This role was a natural extension of her
                  dedication to addressing disparities and cultivating spaces for growth and healing.
                </p>
                <p>
                  Now, at Therapy for Black Men, Sacheen is focused on breaking the stigma surrounding mental health and
                  ensuring that Black men have access to the care they deserve.
                </p>
                <p>
                  Sacheen holds a B.A. in Psychology from Brooklyn College, equipping her with the academic foundation
                  and emotional insight to bridge the gap between the community and the transformative power of therapy.
                </p>
                <p>
                  Her work is not just a career—it is a calling to guide men of color toward a life of wholeness,
                  strength, and self-discovery.
                </p>
              </div>
            </div>
          </section>
          <section className={styles.memberSection}>
            <div className={styles.inner}>
              <div className={styles.flx}>
                <div className={styles.imageContainer}>
                  <img src={Sabrina} alt="Sabrina Lamour" />
                </div>
                <div className={styles.textContainer}>
                  <h2>Sabrina Lamour</h2>
                  <h3>Celebrity Photographer for Therapy for Black Men</h3>
                  <p>
                    "Through the lens, I don’t just capture moments—I uncover stories, emotions, and the essence of who
                    we are." <br />
                    <p className={styles.auther}>— Sabrina Lamour</p>
                  </p>
                  <br />

                  <div className={styles.email}>
                    <IoMailOutline className={styles.icon} />
                    <a href="mailto:SabrinaLamour@therapyforblackmen.org" className={styles.emailLink}>
                      SabrinaLamour@therapyforblackmen.org
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.dfff}>
                <p>
                  Dubbed "Natural Eye," Sabrina Lamour is a worldwide photographer known for her organic, relatable, and
                  deeply personal approach to every shoot. Born in Haiti and raised in the vibrant tapestry of New York
                  City, Sabrina’s grassroots remain in the heart of NYC, but her vision transcends borders, bringing
                  global narratives to life.
                </p>
                <p>
                  With her camera as her voice, Sabrina has traveled across the United States and ventured to Israel,
                  Palestine, Africa, Turkey, Canada, France, and London on photographic missions that capture not just
                  images but the soul of her subjects. Her works have graced the pages of
                  <em>Vogue</em> magazine, while her portfolio boasts collaborations with prominent events and
                  organizations, including:
                </p>
                <div className={styles.list}>
                  <ul>
                    <li>NY Fashion Week</li>
                    <li>Super Bowl XLIV in Miami</li>
                    <li>Pioneer Girls Conference</li>
                    <li>RGE Foundation Annual Conference</li>
                    <li>MLK Now</li>
                    <li>Afro B. Album Release</li>
                    <li>A Night with Chrisette Michele</li>
                    <li>And many more red-carpet events, fashion shows, and charity initiatives</li>
                  </ul>
                </div>
                <p>
                  Sabrina’s work is more than just photography—it’s a reflection of her passion for human connection and
                  storytelling. Her artistry bridges cultures, celebrates diversity, and amplifies voices that often go
                  unheard. Whether she’s behind the scenes of a high-profile event or on a mission to document everyday
                  resilience, Sabrina brings authenticity, care, and a profound respect for her craft and her subjects.
                </p>
                <p>
                  Sabrina’s dedication to community is deeply rooted in her academic and personal journey. A graduate of
                  SUNY Empire State College with a B.S. in Human & Community Services, Sabrina combines her artistic
                  vision with a heart for service. Her role with Therapy for Black Men aligns perfectly with her mission
                  to use her gifts to uplift, inspire, and empower.
                </p>
                <p>
                  Through her photography, Sabrina continues to redefine what it means to see, to understand, and to
                  connect. As the Celebrity Photographer for Therapy for Black Men, she captures the essence of the
                  movement—men standing in their truth, breaking barriers, and embracing healing.
                </p>
              </div>
            </div>
          </section>
        </div>
      </>
    </div>
  )
}
