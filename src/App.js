import './App.css'
import { useRef, useEffect } from 'react'

function App() {
  const ref = useRef()
  const ref2 = useRef()

  useEffect(() => {
    const canvas = ref.current
    const image = ref2.current
    const width = window.innerWidth
    const height = window.innerHeight
    const dpi = window.devicePixelRatio
    canvas.width = width * dpi
    canvas.height = height * dpi
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    const ctx = canvas.getContext('2d')
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    ctx.clearRect(0, 0, width, height)

    ref2.current.addEventListener('load', () => {
      let r = Math.random() * 100
      let g = Math.random() * 10
      let b = Math.random() * 100
      let dir = 4

      const xs = []
      const ys = []
      for (let i = 0; i < 100; i++) {
        xs.push(Math.random() * width)
        ys.push(Math.random() * height)
      }

      function fill() {
        const grd1 = ctx.createLinearGradient(0, 0, 0, height)
        grd1.addColorStop(0, `rgb(0,0,0)`)
        grd1.addColorStop(1, `rgb(${r},${g},${b})`)
        ctx.fillStyle = grd1
        ctx.fillRect(0, 0, width, height)
        if (b < 20 || b > 150) dir *= -1
        b += dir * Math.random()
        g += dir * Math.random()
        r += dir * Math.random()

        ctx.fillStyle = 'yellow'
        for (let i = 0; i < 100; i++) {
          ctx.fillRect(xs[i], ys[i], 2, 2)
        }

        ctx.drawImage(image, width / 8, height / 8)

        requestAnimationFrame(fill)
      }

      fill()
    })
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={ref} />
      <div style={{ display: 'none' }}>
        <img ref={ref2} id="source" src="moon2.png" alt="moon" />
      </div>
      <audio
        controls
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <source
          src="https://s3.us-east-2.amazonaws.com/radioshow-s3uploadbucket-hkjnp01vb17m/nightskies.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  )
}

export default App
