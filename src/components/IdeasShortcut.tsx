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
    <div className="ideas-shortcut" aria-hidden={false}>
      <button
        type="button"
        className="ideas-shortcut__btn"
        onClick={goToIdeas}
        aria-label="Don't know what to make? View project ideas"
      >
        <span className="ideas-shortcut__pulse" aria-hidden />
        <span className="ideas-shortcut__icon" aria-hidden>
          ?
        </span>
        <span className="ideas-shortcut__text">
          <span className="ideas-shortcut__label">Don&apos;t know what to make?</span>
          <span className="ideas-shortcut__cta">See ideas</span>
        </span>
      </button>
    </div>
  )
}
