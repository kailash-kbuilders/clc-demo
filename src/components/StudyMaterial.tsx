import { useLang } from '../i18n/LangContext'
import type { SiteContent } from '../data/content'
import { toast } from './Toast'
import { safeName, startDownload } from '../lib/download'

export default function StudyMaterial({ content }: { content: SiteContent }) {
  const { L } = useLang()

  return (
    <section id="material">
      <div className="w">
        <h2 className="rv">{L(['Study material', 'अध्ययन सामग्री'])}</h2>
        <p className="sub">
          {L([
            'Notes and model papers — download the PDFs below.',
            'नोट्स और मॉडल पेपर — नीचे से PDF डाउनलोड करें।',
          ])}
        </p>
        <div className="grid" id="matGrid">
          {content.materials.map((m, i) => (
            <div className="card rv" key={i}>
              <h3>{L(m.title)}</h3>
              <p className="note">{L(m.sub)}</p>
              <button
                className="btn icdl sm"
                type="button"
                onClick={() =>
                  startDownload(m.file, safeName(L(m.title), 'CLC-material') + '.pdf', L, toast)
                }
              >
                {L(['Download PDF', 'PDF डाउनलोड करें'])}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
