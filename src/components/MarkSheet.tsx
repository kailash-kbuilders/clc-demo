import { useLang } from '../i18n/LangContext'
import type { ResultRow } from '../data/content'

const pct = (r: ResultRow) =>
  r.max_total > 0 ? Math.round((r.total / r.max_total) * 1000) / 10 : 0

export default function MarkSheet({ r }: { r: ResultRow }) {
  const { L } = useLang()
  const subjects = r.subjects && r.subjects.length ? r.subjects : []
  const percentage = pct(r)

  return (
    <div className="ac" id="mark-sheet">
      <div className="ac-head">
        <img className="ac-logo" src="/img/logo.jpg" alt="" />
        <div>
          <h1>CAREER LAUNCHER CLASSES</h1>
          <div className="ac-pill">Navodaya | Military | RMS | Sainik School</div>
          <p className="ac-tag">Your Dream &bull; Our Mission &bull; Bright Future</p>
          <p className="ac-addr">Shastri Nagar, Barmer (Raj.)</p>
        </div>
      </div>

      <div className="ac-banner">
        DISTRICT LEVEL MEGA TEST
        <span className="ac-banner-pill">MARK SHEET</span>
      </div>

      <div className="ac-box">
        <h2>STUDENT DETAILS</h2>
        <table>
          <tbody>
            <tr>
              <td>Roll No.</td>
              <td>: {r.roll_no}</td>
            </tr>
            <tr>
              <td>Student Name</td>
              <td>: {r.name}</td>
            </tr>
            {r.father ? (
              <tr>
                <td>Father&apos;s Name</td>
                <td>: {r.father}</td>
              </tr>
            ) : null}
            {r.class ? (
              <tr>
                <td>Class</td>
                <td>: {r.class}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="ac-box">
        <h2>MARKS</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Max</th>
              <th>Obtained</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>{s.max}</td>
                <td>{r.marks?.[s.name] ?? '-'}</td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>{r.max_total}</b>
              </td>
              <td>
                <b>{r.total}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ms-sum">
        <div>
          <span>{L(['Total marks', 'कुल अंक'])}</span>
          <b>
            {r.total} / {r.max_total}
          </b>
        </div>
        <div>
          <span>{L(['Percentage', 'प्रतिशत'])}</span>
          <b>{percentage}%</b>
        </div>
        {r.rank ? (
          <div>
            <span>{L(['District rank', 'जिला रैंक'])}</span>
            <b>#{r.rank}</b>
          </div>
        ) : null}
      </div>

      <div className="ac-foot">ALL THE BEST FOR YOUR FUTURE &bull; clcbarmer.in</div>
    </div>
  )
}
