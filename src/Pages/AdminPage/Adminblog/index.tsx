import React, { useState, useEffect } from 'react'
import styles from '../admin.module.css'
import RingLoader from '../../../Components/RingLoader'
import { notifyError, notifySuccess } from '../../../Components/Toast'
import { db, storage } from '../../../Share/FireBase'
import { collection, addDoc, Timestamp, getDocs, query, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function Adminbloges() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editBlogId, setEditBlogId] = useState('')
  const [_imageFile, setImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: '',
    author: '',
    tags: '',
  })

  const [blogs, setBlogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 5

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, 'blogs'))
      const querySnapshot = await getDocs(q)
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setBlogs(blogList)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setUploadingImage(true)

    const storageRef = ref(storage, `blogImages/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error(error)
        notifyError('Image upload failed')
        setUploadingImage(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData((prev) => ({ ...prev, image: url }))
          setUploadingImage(false)
          notifySuccess('Image uploaded successfully')
        })
      }
    )
  }

  const handleAddOrUpdateBlog = async () => {
    if (!formData.title || !formData.excerpt || !formData.author) {
      notifyError('Please fill all required fields')
      return
    }

    if (!formData.image && !isEditMode) {
      notifyError('Please upload an image')
      return
    }

    setLoading(true)
    try {
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        author: formData.author,
        image: formData.image,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
        date: Timestamp.now(),
      }

      if (isEditMode) {
        await updateDoc(doc(db, 'blogs', editBlogId), blogData)
        notifySuccess('Blog updated successfully!')
      } else {
        await addDoc(collection(db, 'blogs'), blogData)
        notifySuccess('Blog added successfully!')
      }

      resetForm()
      fetchBlogs()
    } catch (error) {
      console.error(error)
      notifyError('Failed to save blog')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog: any) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      image: blog.image,
      author: blog.author,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
    })
    setEditBlogId(blog.id)
    setIsEditMode(true)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'blogs', id))
      notifySuccess('Blog deleted successfully!')
      fetchBlogs()
    } catch (error) {
      console.error(error)
      notifyError('Failed to delete blog')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      image: '',
      author: '',
      tags: '',
    })
    setImageFile(null)
    setIsEditMode(false)
    setEditBlogId('')
    setShowModal(false)
  }

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  return (
    <div className={styles.w100}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className={styles.title}>📋 Admin Panel - Blogs</h1>
        <button
          className={styles.Addbtn}
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
        >
          + Add
        </button>
      </div>

      <div className={styles.TableOuter}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            style={{
              padding: '8px',
              width: '300px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Read Time</th>
              <th>Tags</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td style={{ width: '20%' }}>{blog.excerpt}</td>
                <td>{blog.author}</td>
                <td>{blog.readTime}</td>
                <td>{Array.isArray(blog.tags) ? blog.tags.join(', ') : ''}</td>
                <td>{blog.image && <img src={blog.image} alt="blog" width="80" />}</td>
                <td>
                  <FaEdit
                    size={16}
                    onClick={() => handleEdit(blog)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  <FaTrash
                    size={16}
                    onClick={() => handleDelete(blog.id)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>{isEditMode ? 'Edit Blog' : 'Add Blog'}</h2>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title *" required />
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Content *"
              required
            />
            <input name="author" value={formData.author} onChange={handleChange} placeholder="Author *" required />
            <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
            <input type="file" accept="image/*" onChange={handleImageUpload} required={!isEditMode} />
            {uploadingImage && <p>Uploading image...</p>}
            {formData.image && (
              <div>
                <p>Image Preview:</p>
                <img src={formData.image} alt="Preview" width="100" />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button onClick={resetForm}>Cancel</button>
              <button onClick={handleAddOrUpdateBlog}>
                {loading ? <RingLoader /> : isEditMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
