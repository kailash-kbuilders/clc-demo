import type { Registration } from '../data/content'

/** A4 at 96dpi - the page we lay the table out on before turning it into a PDF. */
const PAGE_W = 794
const PAGE_H = 1123
const ROWS_PER_PAGE = 24

const COLUMNS: { key: string; label: string; width: string }[] = [
  { key: 'sr', label: 'क्र.स.', width: '5%' },
  { key: 'roll', label: 'Roll No.', width: '11%' },
  { key: 'name', label: 'Name', width: '17%' },
  { key: 'father', label: "Father's Name", width: '15%' },
  { key: 'cls', label: 'Class', width: '8%' },
  { key: 'mobile', label: 'Mobile', width: '11%' },
  { key: 'aadhaar', label: 'Aadhaar', width: '13%' },
  { key: 'address', label: 'Address', width: '20%' },
]

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function rowHtml(r: Registration, sr: number): string {
  const td = (v: unknown) =>
    `<td style="padding:6px 5px;border:1px solid #c9c9d6;vertical-align:top;word-break:break-word;` +
    `color:#111111;background:#ffffff">${esc(v)}</td>`
  return `<tr>${td(sr)}${td(r.roll_no)}${td(r.name)}${td(r.father)}${td(r.class)}` +
    `${td(r.mobile)}${td(r.aadhaar)}${td(r.address)}</tr>`
}

function pageHtml(rows: Registration[], startSr: number, pageNo: number, pages: number, total: number): string {
  const head = COLUMNS.map(
    (c) =>
      `<th style="width:${c.width};background:#241a52;color:#ffffff;font-weight:700;text-align:left;` +
      `padding:7px 5px;font-size:10.5px;border:1px solid #241a52">${c.label}</th>`,
  ).join('')
  const body = rows.map((r, i) => rowHtml(r, startSr + i)).join('')
  const today = new Date().toLocaleDateString('en-IN')
  return `
  <div style="padding:26px 24px;box-sizing:border-box;background:#fff;color:#111;font-family:Mukta,Hind,sans-serif">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #241a52;padding-bottom:8px">
      <div>
        <div style="font-size:22px;font-weight:800;color:#241a52;line-height:1.15">CLC Barmer</div>
        <div style="font-size:12px;color:#555">Career Launcher Classes, Shastri Nagar, Barmer (Raj.)</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:15px;font-weight:700;color:#241a52">Mega Test Registrations</div>
        <div style="font-size:11px;color:#555">${esc(today)} &middot; Total ${total}</div>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;table-layout:fixed;margin-top:12px;font-size:11px">
      <thead>
        <tr>${head}</tr>
      </thead>
      <tbody>${body}</tbody>
    </table>

    <div style="margin-top:10px;font-size:10px;color:#777;text-align:right">Page ${pageNo} / ${pages}</div>
  </div>`
}

const STYLE = '<style>table{border-collapse:collapse;width:100%;table-layout:fixed}</style>'

/**
 * Builds a PDF of every registration and downloads it straight away
 * (no print dialog). Hindi text is rendered by the browser, so it is shaped correctly.
 */
export async function downloadRegistrationsPdf(rows: Registration[]): Promise<void> {
  const [{ jsPDF }, html2canvasMod] = await Promise.all([import('jspdf'), import('html2canvas')])
  const html2canvas = html2canvasMod.default

  try {
    await document.fonts.ready
  } catch {
    /* ignore */
  }

  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${PAGE_W}px;background:#fff;color:#111;`
  document.body.appendChild(host)

  const chunks: Registration[][] = []
  for (let i = 0; i < rows.length; i += ROWS_PER_PAGE) chunks.push(rows.slice(i, i + ROWS_PER_PAGE))
  if (chunks.length === 0) chunks.push([])

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const pageWmm = 210
  const pageHmm = 297
  const margin = 6

  try {
    for (let i = 0; i < chunks.length; i++) {
      host.innerHTML = STYLE + pageHtml(chunks[i], i * ROWS_PER_PAGE + 1, i + 1, chunks.length, rows.length)
      const canvas = await html2canvas(host, { scale: 2, backgroundColor: '#ffffff', logging: false })

      const usableW = pageWmm - margin * 2
      const usableH = pageHmm - margin * 2
      const ratio = canvas.width / usableW
      const hMm = canvas.height / ratio
      const scale = hMm > usableH ? usableH / hMm : 1
      const w = usableW * scale
      const h = hMm * scale

      if (i > 0) pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin + (usableW - w) / 2, margin, w, h)
    }

    pdf.save('CLC-MegaTest-registrations.pdf')
  } finally {
    host.remove()
  }
}
