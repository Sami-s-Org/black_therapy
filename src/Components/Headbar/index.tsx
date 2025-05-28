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
          <source
            src="https://media.istockphoto.com/id/469267480/video/happy-healthy-athlete-appeciating-the-sun-while-on-a-run.mp4?s=mp4-640x640-is&k=20&c=UzM-ooJS19rJbSAvszJ5BTmZS2R80qaVzxyvw9jCwL0="
            type="video/mp4"
          />
        </video>
        <p className={style.Heading}>{heading}</p>
      </div>
    </div>
  )
}
