import './App.css'
import { useRef, useEffect } from 'react'

function App() {
  const ref = useRef()
  const ref2 = useRef()

  useEffect(() => {
    const canvas = ref.current
    let { width, height } = canvas.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    const image = ref2.current
    console.log('t4t')

    ref2.current.addEventListener('load', e => {
      console.log('h1')
      let dir = []
      let r1 = []
      let g1 = []
      let b1 = []

      for (let i = 0; i < 100; i++) {
        r1.push(Math.random() * 100)
        g1.push(Math.random() * 10)
        b1.push(Math.random() * 100)
        dir.push(4)
      }

      const xs = []
      const ys = []
      for (let i = 0; i < 100; i++) {
        xs.push(Math.random() * width)
        ys.push(Math.random() * height)
      }
      let k = 0

      function fill() {
        let p = 1
        let c = `rgb(0,0,0)`
        for (let i = 0; i < 10; i++) {
          let grd1
          if (k > 4) {
            grd1 = ctx.createLinearGradient(0, 0, width, 0)
          } else if (k > 3) {
            grd1 = ctx.createLinearGradient(0, 0, width, height)
          } else if (k > 2) {
            grd1 = ctx.createLinearGradient(0, 0, width, height / 2)
          } else if (k > 1) {
            grd1 = ctx.createLinearGradient(0, 0, width / 2, height / 2)
          } else {
            grd1 = ctx.createLinearGradient(0, 0, 0, height)
          }
          const r = r1[i]
          const g = g1[i]
          const b = b1[i]
          grd1.addColorStop(0, c)
          c = `rgb(${r},${g},${b})`

          grd1.addColorStop(1, c)
          ctx.fillStyle = grd1
          ctx.fillRect(
            width * (1 - p) * Math.random(),
            height * (1 - p),
            width - width * (1 - p) * 2,
            height - height * (1 - p) * 2,
          )
          p -= 0.01
          if (b1[i] < 20 || b1[i] > 150) dir[i] *= -1
          b1[i] += dir[i] * Math.random()
          g1[i] += dir[i] * Math.random()
          r1[i] += dir[i] * Math.random()
        }

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
    <>
      <canvas
        ref={ref}
        style={{ margin: 0, width: '100vw', height: '100vh', display: 'block' }}
      />
      <div style={{ display: 'none' }}>
        <img ref={ref2} id="source" src="moon2.png" alt="moon" />
      </div>
    </>
  )
}

export default App
