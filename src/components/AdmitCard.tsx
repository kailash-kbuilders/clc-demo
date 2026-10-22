import type { PosterBlock, Registration } from '../data/content'
import { ADMIT_INSTRUCTIONS, CONFIG } from '../data/site'

const EXAM_FOR = [
  'Navodaya Vidyalaya (JNV)',
  'Military School (RMS)',
  'Sainik School (AISSEE)',
  'Other Govt. Competitive Exams',
]

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
          <div className="ac-pill">
            Navodaya | Military | RMS | Sainik School | Other Govt. Exams
          </div>
          <p className="ac-tag">Your Dream &bull; Our Mission &bull; Bright Future</p>
          <p className="ac-loc">&#128205; Shastri Nagar, Barmer (Raj.)</p>
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
              <Row label="School" value={reg.school} />
              <Row label="Category" value={reg.category} />
              <Row label="Date of Birth" value={reg.dob} />
              <Row label="Gender" value={reg.gender} />
              <Row label="Mobile No." value={reg.mobile} />
              <Row label="Address" value={reg.address} />
            </tbody>
          </table>
        </div>

        <div className="ac-result">
          <span className="ac-title">RESULT</span>
          <p>Result will be published on our website on</p>
          <span className="ac-date">{block.resultDate || '\u2014'}</span>
          <p className="ac-hi">परिणाम इस वेबसाइट पर इस तारीख को देखें</p>
          <span className="ac-site">{site}</span>
        </div>
      </div>

      <div className="ac-box" style={{ marginTop: 14 }}>
        <h2>EXAM DETAILS</h2>
        <div className="ac-exam">
          <table>
            <tbody>
              <Row label="Test Date" value={block.examDate} />
              <Row label="Reporting Time" value={block.reportingTime} />
              <Row label="Exam Time" value={block.examTime} />
              <Row label="Test Centre" value={block.centre} />
            </tbody>
          </table>
          <div className="ac-for">
            <b>EXAM FOR</b>
            <ul>
              {EXAM_FOR.map((e) => (
                <li key={e}>&#10003; {e}</li>
              ))}
            </ul>
            <div className="ac-slogan">DREAM &bull; PREPARE &bull; ACHIEVE</div>
          </div>
        </div>
      </div>

      <div className="ac-box" style={{ marginTop: 14 }}>
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
