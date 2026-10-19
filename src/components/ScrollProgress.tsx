import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const ref = useScrollProgress()
  return <div id="sp" ref={ref} aria-hidden="true" />
}
