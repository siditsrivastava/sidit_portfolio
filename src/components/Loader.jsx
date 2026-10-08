import { useEffect, useState } from 'react'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame
    let finishTimer

    const update = (now) => {
      const next = Math.min(100, Math.round(((now - start) / 1250) * 100))
      setProgress(next)
      if (next < 100) frame = requestAnimationFrame(update)
      else finishTimer = setTimeout(onComplete, 280)
    }

    frame = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  return <div className={`loader ${progress === 100 ? 'leaving' : ''}`}>
    <div className="loader-mark">S<span>◦</span></div>
    <div className="loader-bottom"><span>Loading experience</span><b>{String(progress).padStart(3, '0')}%</b></div>
    <div className="loader-line" style={{ transform: `scaleX(${progress / 100})` }} />
  </div>
}
