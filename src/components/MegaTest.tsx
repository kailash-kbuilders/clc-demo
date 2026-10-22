import { useLang } from '../i18n/LangContext'
import { waFor } from '../lib/links'
import type { PosterBlock, SiteContent } from '../data/content'
import { registrationState } from '../data/content'

function PosterCard({ block, kind }: { block: PosterBlock; kind: 'mega' | 'series' }) {
  const { L } = useLang()
  const closed = kind === 'mega' && registrationState(block) === 'closed'
  return (
    <div className={'sch rv' + (closed ? ' sch-closed' : '')}>
      <div className="sch-imgw">
        <img src={block.poster} alt={L(block.title)} data-zoom loading="lazy" />
        {closed && (
          <div className="sch-closed-ov">
            <span className="sch-cross">&#10007;</span>
            <b>REGISTRATION CLOSED</b>
            <span>रजिस्ट्रेशन बंद हो गया है</span>
          </div>
        )}
      </div>
      <div>
        <h3>{L(block.title)}</h3>
        <p>{L(block.description)}</p>
        {kind === 'mega' && registrationState(block) === 'open' && (
          <a className="btn reg-btn" href="/mega-test">
            {L(['Register for the Mega Test', 'मेगा टेस्ट के लिए रजिस्टर करें'])}
          </a>
        )}
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
            ? blocks[0].kind === 'mega'
              ? L(['Mega Test', 'मेगा टेस्ट'])
              : L(['Test Series', 'टेस्ट सीरीज़'])
            : L(['Mega Test & Test Series', 'मेगा टेस्ट व टेस्ट सीरीज़'])}
        </h2>
        {blocks.map((b) => (
          <PosterCard key={b.kind} block={b.block} kind={b.kind} />
        ))}
      </div>
    </section>
  )
}
