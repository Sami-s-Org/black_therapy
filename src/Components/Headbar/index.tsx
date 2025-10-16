// src/Components/Headbar/index.tsx
import style from './headbar.module.css'

interface HeaderBarProps {
  heading: string
}

export default function HeaderBar({ heading }: HeaderBarProps) {
  return (
    <div>
      <div className={style.main}>
        <video className={style.backgroundVideo} autoPlay loop muted>
          <source src="/main.webm" type="video/webm" />
        </video>
        <p className={style.Heading}>{heading}</p>
      </div>
    </div>
  )
}
