import React from 'react'
import Carousel from 'react-multi-carousel'
import classNames from 'classnames'
import 'react-multi-carousel/lib/styles.css'
import style from './homeslider.module.css'

const responsive = {
  lgdesktop: {
    breakpoint: { max: 3000, min: 1441 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1041 },
    items: 3,
    slidesToSlide: 1,
  },
  Laptop: {
    breakpoint: { max: 1040, min: 769 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 1,
    slidesToSlide: 1,
  },
}

const HomeSlider = ({ sliderItems }) => {
  return (
    <div className="parent" style={{ marginBottom: '0px' }}>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        arrows={false}
        centerMode={false}
        showDots={false}
        infinite={true}
        dotListClass="custom-dot-list-style"
      >
        {sliderItems.map((item, index) => (
          <div className={style.slider} key={index}>
            <img alt="slider" src={item.imageUrl} className={style.imgs} />
            <p className={classNames(style.heading)}>{item.Heading}</p>
            {/* <p className={classNames(style.text)}>{item.text}</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default HomeSlider
