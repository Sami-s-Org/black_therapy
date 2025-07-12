import { useEffect } from 'react'
import styles from './board.module.css'
import HeaderBar from '../../Components/Headbar'
import { IoMailOutline } from 'react-icons/io5'
import Georges from '../../assets/Capture22.jpg'
import Steven from '../../assets/Capture.jpg'

const BoardMembers = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <HeaderBar heading="Board Members" />
      <div className={styles.wrapper}>
        <section className={styles.memberSection}>
          <div className={styles.inner}>
            <div className={styles.flx}>
              <div className={styles.imageContainer}>
                <img src={Georges} alt="Steven Pascal" />
              </div>
              <div className={styles.textContainer}>
                <h2>Georges Louis-Jeune</h2>
                <h3>Board Member</h3>
                <p>
                  Georges Louis-Jeune is a devoted leader, compassionate advocate, and a champion of creating meaningful
                  impact for individuals and families. As the Information Systems Manager for CVS Corporation, Georges
                  balances his professional expertise with a deeply personal mission: to empower others to live with
                  purpose, joy, and resilience
                </p>{' '}
                <p>
                  A native of Brooklyn, NY, Georges carries the values of community, accountability, and leadership into
                  every aspect of his life. With a bachelor’s degree in Business and a focus on leadership from
                  Northeastern University, he has cultivated a career grounded in problem-solving and forward-thinking
                  strategies. But for Georges, leadership extends beyond the workplace it’s about listening, uplifting,
                  and building a strong foundation for others to thrive.
                </p>
                <div className={styles.email}>
                  <IoMailOutline className={styles.icon} />
                  <a href="mailto:GeorgesLouisJeune@therapyforblackmen.org" className={styles.emailLink}>
                    GeorgesLouisJeune@therapyforblackmen.org
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.dfff}>
              <p>
                For over 23 years, Georges has shared his life with his wife, building a family rooted in love and
                support in their Massachusetts home with their two children. His belief in the power of a strong support
                system fuels his passion for giving back. He thrives on being involved in processes that not only
                transform lives but also strengthen families and communities
              </p>
              <p>
                Georges holds fast to the idea that having the right tools whether for a project, a personal challenge,
                or a dream makes success possible. Yet he also recognizes the power of human connection, believing that
                sometimes all it takes to change a life is a listening ear.
              </p>
              <h3>Why Therapy for Black Men Matters</h3>
              <p>
                For Georges, Therapy for Black Men represents more than a platform it’s a movement to dismantle
                barriers, foster healing, and empower Black men to reclaim their mental health and well-being. He
                understands that accountability, leadership, and support are key ingredients in personal transformation,
                and he is committed to helping the organization expand its reach and impact.
              </p>
              <p>
                "When we empower Black men to heal and lead, we transform families, communities, and the future. It all
                begins with connection and the courage to listen."
              </p>
            </div>
          </div>
        </section>

        <section className={styles.memberSection}>
          <div className={styles.inner}>
            <div className={styles.flx}>
              <div className={styles.imageContainer}>
                <img src={Steven} alt="Steven Pascal" />
              </div>
              <div className={styles.textContainer}>
                <h2>Steven Pascal</h2>
                <h3>Board Member</h3>
                <p>
                  Steven Pascal is a dedicated advocate for vulnerable populations, bringing 25 years of transformative
                  experience in human services to Therapy for Black Men. His career spans critical areas such as
                  juvenile justice, workforce development, specialized foster care, and both elementary and higher
                  education. Throughout his journey, Steven has remained steadfast in his mission to uplift communities
                  and create pathways for healing and opportunity.
                </p>{' '}
                <p>
                  Currently, Steven serves as the Director of Home Visiting at the Children’s Trust of Massachusetts,
                  where he oversees 24 programs supporting young, first-time parents. Through his leadership, these
                  programs provide critical resources and compassionate care to families navigating some of life’s most
                  challenging moments. Steven’s expertise extends to facilitating impactful trainings and workshops,
                  often sharing his knowledge at state and national conferences dedicated to serving vulnerable
                  communities.
                </p>
                <div className={styles.email}>
                  <IoMailOutline className={styles.icon} />
                  <a
                    href="mailto:StevenPascal@therapyforblackmen.org
"
                    className={styles.emailLink}
                  >
                    StevenPascal@therapyforblackmen.org
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.dfff}>
              <p>
                Steven’s certification in the Strengthening Families Protective Factors framework, awarded by the
                Alliance of Children’s Trust Funds, underscores his commitment to equipping families with 38 the tools
                to thrive. His work is a testament to the belief that strengthening individuals strengthens entire
                communities.
              </p>
              <p>
                A proud native of Brooklyn, NY, Steven holds a Bachelor of Political Science from Salem State University
                and a Master of Urban Affairs from Boston University. As a devoted husband and father, he understands
                the importance of family and uses his personal and professional insights to guide his advocacy for Black
                men and boys.
              </p>

              <p>
                Steven’s involvement with Therapy for Black Men reflects his dedication to creating spaces where Black
                men can access the support they need to heal, grow, and realize their full potential.
              </p>
              <p>
                “When we invest in the well-being of men, we invest in the future of families, communities, and
                generations."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BoardMembers
