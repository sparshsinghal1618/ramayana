import { scrollToId, useActiveSection } from '../lib/hooks';
import { useExperience } from '../experience/ExperienceContext';

const railItems = [
  { id: 'prologue', label: 'Prologue' },
  { id: 'books', label: 'The Books' },
  { id: 'chapters', label: 'Story' },
  { id: 'characters', label: 'Characters' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'objects', label: 'Objects' },
  { id: 'traditions', label: 'Traditions' },
  { id: 'about', label: 'About' },
];

export function ProgressRail() {
  const { reducedMotion } = useExperience();
  const active = useActiveSection(railItems.map((item) => item.id));

  return (
    <aside className="progress-rail" aria-label="Section navigation">
      <span className="progress-rail-line" aria-hidden="true" />
      <ul>
        {railItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={active === item.id ? 'is-active' : ''}
              onClick={() => scrollToId(item.id, reducedMotion)}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className="rail-dot" aria-hidden="true" />
              <span className="rail-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
