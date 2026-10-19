import { useLang } from '../i18n/LangContext'
import { useSiteContent } from '../hooks/useSiteContent'
import { waFor } from '../lib/links'
import type { PosterBlock } from '../data/content'

function PosterCard({ block, kind }: { block: PosterBlock; kind: 'mega' | 'series' }) {
  const { L } = useLang()
  const hasPoster = Boolean(block.poster)
  return (
    <div className="sch rv">
      {hasPoster ? (
        <img src={block.poster} alt={L(block.title)} data-zoom loading="lazy" />
      ) : (
        <div className="sch-ph" aria-hidden="true">
          {L(['Poster coming soon', 'पोस्टर जल्द आएगा'])}
        </div>
      )}
      <div>
        <h3>{L(block.title)}</h3>
        <p>{L(block.description)}</p>
        <div className="sch-actions">
          <a
            className="btn wa icwa"
            href={waFor(kind === 'mega' ? 'mega' : 'tests', L)}
            target="_blank"
            rel="noopener"
          >
            {kind === 'mega'
              ? L(['Ask about the Mega Test', 'मेगा टेस्ट के बारे में पूछें'])
              : L(['Ask about the Test Series', 'टेस्ट सीरीज़ के बारे में पूछें'])}
          </a>
          {hasPoster && (
            <a className="btn icdl ghost" href={block.poster} target="_blank" rel="noopener noreferrer" download>
              {L(['Download poster', 'पोस्टर डाउनलोड करें'])}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MegaTest() {
  const { L } = useLang()
  const content = useSiteContent()

  return (
    <section id="tests">
      <div className="w">
        <h2 className="rv">{L(['Mega Test & Test Series', 'मेगा टेस्ट व टेस्ट सीरीज़'])}</h2>
        <PosterCard block={content.megatest} kind="mega" />
        <PosterCard block={content.testseries} kind="series" />
      </div>
    </section>
  )
}
