import { chapters } from '../data/story';
import { scrollToId } from '../lib/hooks';
import { useExperience } from '../experience/ExperienceContext';
import { romanNumerals } from '../data/visuals';

const footerLinks = [
  { id: 'books', label: 'The Books' },
  { id: 'chapters', label: 'Story' },
  { id: 'characters', label: 'Characters' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'objects', label: 'Objects' },
  { id: 'traditions', label: 'Traditions' },
  { id: 'about', label: 'About' },
  { id: 'credits', label: 'Credits' },
];

export function Footer() {
  const { reducedMotion } = useExperience();

  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div className="footer-wordmark">
          <p className="footer-devanagari" lang="sa">
            रामायण
          </p>
          <p className="footer-title">Ramayana</p>
          <p className="footer-sub">The eternal journey of dharma</p>
        </div>
        <div className="footer-nav">
          <div>
            <p className="eyebrow">Contents</p>
            <ul>
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => scrollToId(link.id, reducedMotion)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Elsewhere in the book</p>
            <ul>
              {footerLinks.slice(5).map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => scrollToId(link.id, reducedMotion)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">The twelve books</p>
            <ul className="footer-books">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(`chapter-${String(chapter.number).padStart(2, '0')}`, reducedMotion)}
                  >
                    <span>{romanNumerals[chapter.number - 1]}</span>
                    <span>{chapter.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>© 2026 · An independent interactive edition</p>
        <button type="button" className="back-to-top" onClick={() => scrollToId('top', reducedMotion)}>
          Top <span aria-hidden="true">↑</span>
        </button>
      </div>
      <p className="footer-giant" aria-hidden="true" />
    </footer>
  );
}
