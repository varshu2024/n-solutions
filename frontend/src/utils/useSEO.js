import { useEffect } from 'react'

/**
 * useSEO – Dynamically updates <title>, <meta name="description">,
 * <meta name="keywords">, canonical link, and Open Graph tags.
 * Resets all tags to site defaults on component unmount.
 */
export function useSEO({
  title,
  description,
  keywords = '',
  canonical = '',
  ogImage = '/og-image.png',
  ogType = 'website',
} = {}) {
  useEffect(() => {
    const SITE_NAME = 'N Solutions'
    const DEFAULT_TITLE = 'N Solutions | Solar EPC – Engineering, Procurement & Construction'
    const DEFAULT_DESC =
      'N Solutions is an ISO 9001:2015 certified Solar EPC company with 16+ years of experience across 9 states in India. We deliver residential, commercial & industrial solar solutions.'
    const DEFAULT_KEYWORDS =
      'solar EPC, solar installation, solar panels, commercial solar, residential solar, PM Surya Ghar, NREDCAP, APEPDCL, net metering, N Solutions'

    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
    const metaDesc = description || DEFAULT_DESC
    const metaKeywords = keywords || DEFAULT_KEYWORDS
    const canonicalURL = canonical || window.location.origin + window.location.pathname

    // ── Title ──────────────────────────────────────────────
    document.title = fullTitle

    // ── Helpers ────────────────────────────────────────────
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName.trim(), attrValue.replace(/"/g, '').trim())
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
      return el
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
      return el
    }

    // ── Standard meta ──────────────────────────────────────
    setMeta('meta[name="description"]', 'name="description"', metaDesc)
    setMeta('meta[name="keywords"]', 'name="keywords"', metaKeywords)

    // ── Open Graph ─────────────────────────────────────────
    setMeta('meta[property="og:title"]', 'property="og:title"', fullTitle)
    setMeta('meta[property="og:description"]', 'property="og:description"', metaDesc)
    setMeta('meta[property="og:type"]', 'property="og:type"', ogType)
    setMeta('meta[property="og:url"]', 'property="og:url"', canonicalURL)
    setMeta('meta[property="og:image"]', 'property="og:image"', ogImage)
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', SITE_NAME)

    // ── Twitter Card ───────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', metaDesc)
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', ogImage)

    // ── Canonical ──────────────────────────────────────────
    setLink('canonical', canonicalURL)

    // ── Cleanup: reset to defaults on unmount ──────────────
    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]', 'name="description"', DEFAULT_DESC)
      setMeta('meta[name="keywords"]', 'name="keywords"', DEFAULT_KEYWORDS)
      setMeta('meta[property="og:title"]', 'property="og:title"', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]', 'property="og:description"', DEFAULT_DESC)
      setMeta('meta[property="og:url"]', 'property="og:url"', window.location.origin)
    }
  }, [title, description, keywords, canonical, ogImage, ogType])
}
