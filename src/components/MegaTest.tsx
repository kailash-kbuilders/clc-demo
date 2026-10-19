import { useLang } from '../i18n/LangContext'
import { waFor } from '../lib/links'
import { toast } from './Toast'
import { safeName, startDownload } from '../lib/download'
import type { PosterBlock, SiteContent } from '../data/content'

function PosterCard({ block, kind }: { block: PosterBlock; kind: 'mega' | 'series' }) {
  const { L } = useLang()
  return (
    <div className="sch rv">
      <img src={block.poster} alt={L(block.title)} data-zoom loading="lazy" />
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
          <button
            className="btn icdl ghost"
            type="button"
            onClick={() =>
              startDownload(block.poster, safeName(L(block.title), 'CLC-poster') + '.jpg', L, toast)
            }
          >
            {L(['Download poster', 'पोस्टर डाउनलोड करें'])}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MegaTest({ content }: { content: SiteContent }) {
  const { L } = useLang()

  // A block only exists once the admin has added a poster for it.
  const blocks: { block: PosterBlock; kind: 'mega' | 'series' }[] = []
  if (content.megatest.poster) blocks.push({ block: content.megatest, kind: 'mega' })
  if (content.testseries.poster) blocks.push({ block: content.testseries, kind: 'series' })

  if (blocks.length === 0) return null

  return (
    <section id="tests">
      <div className="w">
        <h2 className="rv">
          {blocks.length === 1
            ? L(['Test', 'टेस्ट'])
            : L(['Mega Test & Test Series', 'मेगा टेस्ट व टेस्ट सीरीज़'])}
        </h2>
        {blocks.map((b) => (
          <PosterCard key={b.kind} block={b.block} kind={b.kind} />
        ))}
      </div>
    </section>
  )
}
