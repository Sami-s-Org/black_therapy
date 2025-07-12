import React, { useEffect, useState } from 'react'
import styles from './blog.module.css'
import { motion } from 'framer-motion'
import HeaderBar from '../../Components/Headbar'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Share/FireBase'
import dummay from '../../assets/dfb58278-4ea5-44e3-bbfd-79dc456ff3b8.jpeg'

interface Blog {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  readTime: string
  tags: string[]
}

const BlogPage = () => {
  const [blogData, setBlogData] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const navigate = useNavigate()

  const handleExploreMore = (blog: Blog) => {
    navigate('/blogDetails', { state: blog })
  }

  const fetchBlogs = async () => {
    const blogCollectionRef = collection(db, 'blogs')
    const snapshot = await getDocs(blogCollectionRef)
    const blogList = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        excerpt: data.excerpt,
        image: data.image,
        date: data.date?.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        author: data.author,
        readTime: data.readTime,
        tags: data.tags || [],
      }
    }) as Blog[]
    setBlogData(blogList)
    setFilteredBlogs(blogList)
  }

  useEffect(() => {
    fetchBlogs()
    window.scrollTo(0, 0)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    setCurrentPage(1)
    const filtered = blogData.filter(
      (blog) => blog.title.toLowerCase().includes(value) || blog.tags.some((tag) => tag.toLowerCase().includes(value))
    )
    setFilteredBlogs(filtered)
  }

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  return (
    <div>
      <HeaderBar heading="Blogs" />
      <div className={styles.Wrapper}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search blogs by title or tags..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchBar}
          />
        </div>

        <motion.div
          className={styles.heroContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {currentBlogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            currentBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                className={styles.card}
                whileHover={{ scale: 1.02, rotateX: 4, rotateY: 4 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <div className={styles.imageWrapper}>
                  <img src={blog.image || dummay} alt={blog.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                  <h1>{blog.title}</h1>
                  <p className={styles.clamptext}>{blog.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{blog.date}</span>
                  </div>
                  <div className={styles.tags}>
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className={styles.readMore} onClick={() => handleExploreMore(blog)}>
                    Explore More
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        <div className={styles.PaginationContainer}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.PaginationBtn}
          >
            ⬅ Prev
          </button>

          <span className={styles.PaginationText}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.PaginationBtn}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
