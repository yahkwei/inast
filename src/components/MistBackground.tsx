import './MistBackground.css'

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 4}px`,
  dur: `${12 + Math.random() * 18}s`,
  delay: `${Math.random() * -20}s`,
}))

export default function MistBackground() {
  return (
    <div className="mist-bg" aria-hidden="true">
      <div className="mist-bg__layer mist-bg__layer--1" />
      <div className="mist-bg__layer mist-bg__layer--2" />
      <div className="mist-bg__layer mist-bg__layer--3" />
      <div className="mist-bg__particles">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="mist-bg__particle"
            style={{
              left: p.left,
              top: p.top,
              '--size': p.size,
              '--dur': p.dur,
              '--delay': p.delay,
            } as Record<string, string>}
          />
        ))}
      </div>
    </div>
  )
}
