import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import './pages.css'

export default function Order() {
  const navigate = useNavigate()

  return (
    <div className="page page--wide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page__title">Start a Project</h1>
        <p className="page__subtitle">
          Choose the path that fits you. Businesses get the full scope treatment;
          individuals get a streamlined experience.
        </p>
      </motion.div>

      <div className="page__divider" />

      <motion.div
        className="page__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="page__card">
          <h3>Business</h3>
          <p>
            Large-scale projects with complex requirements. Upload your own scope
            documents, define every detail, and expect perfection at every layer.
          </p>
          <MistButton variant="large" onClick={() => navigate('/order/business')}>
            Business Order
          </MistButton>
        </div>

        <div className="page__card">
          <h3>Individual</h3>
          <p>
            A focused questionnaire to capture your app idea — platform, purpose,
            and features — without the overhead of a full scope document.
          </p>
          <MistButton variant="large" onClick={() => navigate('/order/individual')}>
            Individual Order
          </MistButton>
        </div>
      </motion.div>
    </div>
  )
}
