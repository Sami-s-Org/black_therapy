import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './blog.module.css'
import HeaderBar from '../../Components/Headbar'
import dummay from '../../assets/dfb58278-4ea5-44e3-bbfd-79dc456ff3b8.jpeg'

const BlogDetails = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  if (!state) {
    return (
      <div className={styles.notFound}>
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    )
  }

  const { title, image, author, date, readTime, tags, excerpt } = state

  return (
    <div>
      <HeaderBar heading="Blog Details" />
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={image || dummay} alt={title} />
        </div>
        <div className={styles.content}>
          <h1>{title}</h1>
          <div className={styles.meta}>
            <span>By {author}</span> • <span>{date}</span> • <span>{readTime}</span>
          </div>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.tags}>
            {tags.map((tag: string, idx: number) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
