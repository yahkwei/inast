import { useNavigate, useLocation } from 'react-router-dom'
import { PROJECT_IDEAS_SECTION_ID } from '../lib/anchors'
import './IdeasShortcut.css'

export default function IdeasShortcut() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToIdeas = () => {
    const isHome =
      location.pathname === '/' ||
      location.pathname === '' ||
      location.pathname.endsWith('/inast') ||
      location.pathname.endsWith('/inast/')

    if (isHome) {
      document.getElementById(PROJECT_IDEAS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    navigate(`/#${PROJECT_IDEAS_SECTION_ID}`)
  }

  return (
    <aside className="ideas-shortcut">
      <button
        type="button"
        className="ideas-shortcut__trigger"
        onClick={goToIdeas}
        aria-label="Don't know what to make? View project ideas"
      >
        <span className="ideas-shortcut__spine" aria-hidden>
          <span className="ideas-shortcut__spine-text">Ideas</span>
        </span>

        <span className="ideas-shortcut__panel">
          <span className="ideas-shortcut__shimmer" aria-hidden />
          <span className="ideas-shortcut__content">
            <span className="ideas-shortcut__eyebrow">Not sure where to start?</span>
            <span className="ideas-shortcut__title">Don&apos;t know what to make?</span>
            <span className="ideas-shortcut__link">See project ideas</span>
          </span>
        </span>
      </button>
    </aside>
  )
}
