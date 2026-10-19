import { useLang } from '../i18n/LangContext'
import { CONFIG } from '../data/site'
import { mapDirections, mapEmbed, telLink } from '../lib/links'

export default function Contact() {
  const { L } = useLang()
  return (
    <section id="contact">
      <div className="w">
        <h2 className="rv">{L(['Location & contact', 'पता व संपर्क'])}</h2>
        <div className="two">
          <div className="rv">
            <iframe
              className="map"
              id="mapF"
              title="CLC Barmer on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbed()}
            />
            <p className="pin">
              <span className="icpin" />
              <span>{L(CONFIG.address)}</span>
            </p>
          </div>
          <div className="card rv contact-info">
            <p className="ph">
              <span className="ictel" />
              <a href={telLink()}>{CONFIG.phoneShow}</a>
            </p>
            <p style={{ margin: '14px 0 0' }}>
              <a
                className="btn dir icdir"
                id="dir"
                href={mapDirections()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {L(['Get directions', 'दिशा-निर्देश'])}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
