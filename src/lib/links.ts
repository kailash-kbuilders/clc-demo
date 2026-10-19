import { CONFIG, MSG } from '../data/site'
import type { Pair } from '../i18n/LangContext'

export function waLink(message: string): string {
  return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(message)}`
}

export function waFor(key: keyof typeof MSG, L: (v: Pair) => string, course?: string): string {
  if (course) {
    return waLink(
      L([
        `Hello, I would like details about the ${course} course.`,
        `नमस्ते, मुझे ${course} कोर्स की जानकारी चाहिए।`,
      ]),
    )
  }
  return waLink(L(MSG[key] || MSG.general))
}

export function telLink(): string {
  return `tel:+${CONFIG.phone}`
}

export function mapEmbed(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed`
}

export function mapDirections(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONFIG.mapQuery)}`
}
