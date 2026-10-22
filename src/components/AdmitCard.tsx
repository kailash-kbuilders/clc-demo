import type { PosterBlock, Registration } from '../data/content'
import { ADMIT_INSTRUCTIONS, CONFIG } from '../data/site'

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <tr>
      <td>{label}</td>
      <td>: {value}</td>
    </tr>
  )
}

export default function AdmitCard({
  reg,
  block,
}: {
  reg: Registration
  block: PosterBlock
}) {
  const site = CONFIG.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className="ac" id="admit-card">
      <div className="ac-head">
        <img className="ac-logo" src="/img/logo.jpg" alt="CLC Barmer" />
        <div>
          <h1>CAREER LAUNCHER CLASSES</h1>
          <div className="ac-pill">Navodaya | Military | RMS | Sainik School</div>
          <p className="ac-tag">Your Dream &bull; Our Mission &bull; Bright Future</p>
          <p className="ac-loc">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0b2a5b" aria-hidden="true" style={{ verticalAlign: '-1px' }}>
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>{' '}
            Shastri Nagar, Barmer (Raj.)
          </p>
        </div>
      </div>

      <div className="ac-banner">
        DISTRICT LEVEL MEGA TEST
        <span className="ac-banner-pill">ADMIT CARD</span>
      </div>

      <div className="ac-grid">
        <div className="ac-box">
          <h2>STUDENT DETAILS</h2>
          <table>
            <tbody>
              <Row label="Roll No." value={reg.roll_no} />
              <Row label="Student Name" value={reg.name} />
              <Row label="Father's Name" value={reg.father} />
              <Row label="Class" value={reg.class} />
              <Row label="Category" value={reg.category} />
              <Row label="Date of Birth" value={reg.dob} />
              <Row label="Gender" value={reg.gender} />
              <Row label="Mobile No." value={reg.mobile} />
            </tbody>
          </table>
        </div>

        <div className="ac-side">
          {reg.photo ? (
            <img className="ac-photo" src={reg.photo} alt="" />
          ) : (
            <div className="ac-photo ac-photo-empty">PHOTO</div>
          )}

          <div className="ac-result">
          <span className="ac-title">RESULT</span>
          <p>Result will be published on our website and WhatsApp group on</p>
          <span className="ac-date">{block.resultDate || '\u2014'}</span>
          <p className="ac-hi">परिणाम हमारी वेबसाइट और WhatsApp ग्रुप पर इस तारीख को देखें</p>
            <span className="ac-site">{site}</span>
          </div>
        </div>
      </div>

      <div className="ac-box ac-exam-box">
        <h2>EXAM DETAILS</h2>
        <table>
          <tbody>
            <Row label="Test Centre" value={block.centre} />
          </tbody>
        </table>
      </div>

      <div className="ac-box ac-ins-box">
        <h2>IMPORTANT INSTRUCTIONS</h2>
        <ol className="ac-ins">
          {ADMIT_INSTRUCTIONS.map((ins, i) => (
            <li key={i}>{ins[1]}</li>
          ))}
        </ol>
      </div>

      <div className="ac-foot">ALL THE BEST FOR YOUR EXAM</div>
    </div>
  )
}
