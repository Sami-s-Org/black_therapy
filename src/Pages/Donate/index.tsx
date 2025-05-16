import { useEffect } from 'react'
import HeaderBar from '../../Components/Headbar'

export default function Donate() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div>
      <HeaderBar heading="Donate" />
    </div>
  )
}
