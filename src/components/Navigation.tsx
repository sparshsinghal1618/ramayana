import { useEffect, useRef, useState } from 'react';
import { useExperience, type ProfileSetting } from '../experience/ExperienceContext';
import { scrollToId, useActiveSection, useBodyLock, useEscape } from '../lib/hooks';

const links = [
  { id: 'books', label: 'The Books' },
  { id: 'chapters', label: 'Story' },
  { id: 'characters', label: 'Characters' },
  { id: 'atlas', label: 'Atlas' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'objects', label: 'Objects' },
  { id: 'traditions', label: 'Traditions' },
];

const sectionIds = [
  'top',
  'prologue',
  'books',
  'chapters',
  'characters',
  'atlas',
  'timeline',
  'objects',
  'traditions',
  'about',
];

const profileOptions: Array<{ id: ProfileSetting; letter: string; label: string; note: string }> = [
  { id: 'auto', letter: 'A', label: 'Auto', note: 'Detect this device' },
  { id: 'a', letter: 'A', label: 'Cinematic', note: 'Full detail' },
  { id: 'b', letter: 'B', label: 'Balanced', note: 'Lighter rendering' },
  { id: 'c', letter: 'C', label: 'Essential', note: 'Minimum load' },
];

export function Navigation() {
  const {
    audioEnabled,
    audioSupported,
    audioError,
    toggleAudio,
    profileSetting,
    profile,
    setProfileSetting,
    reducedMotion,
    motionOverride,
    setMotionOverride,
  } = useExperience();
  const reduced = reducedMotion;
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  useBodyLock(menuOpen);
  useEscape(() => {
    setMenuOpen(false);
    setSettingsOpen(false);
  }, menuOpen || settingsOpen);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 48);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (event: MouseEvent) => {
      if (!settingsRef.current?.contains(event.target as Node)) setSettingsOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [settingsOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    setSettingsOpen(false);
    scrollToId(id, reduced);
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header-inner">
          <a
            className="wordmark"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              go('top');
            }}
            aria-label="Ramayana, back to the beginning"
          >
            <span className="wordmark-devanagari">रामायण</span>
            <span className="wordmark-english">Ramayana</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : ''}
                aria-current={active === link.id ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className={`icon-button sound-toggle ${audioEnabled ? 'is-on' : ''}`}
              onClick={toggleAudio}
              aria-pressed={audioEnabled}
              aria-label={audioEnabled ? 'Mute ambience' : 'Play ambience'}
              title={
                audioSupported
                  ? audioEnabled
                    ? 'Mute ambience'
                    : 'Play ambience'
                  : 'Audio is not supported in this browser'
              }
              disabled={!audioSupported}
            >
              <span className="sound-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
            <div className="settings-wrap" ref={settingsRef}>
              <button
                type="button"
                className={`icon-button settings-toggle ${settingsOpen ? 'is-on' : ''}`}
                onClick={() => setSettingsOpen((open) => !open)}
                aria-expanded={settingsOpen}
                aria-controls="settings-panel"
                aria-label="Reading and performance settings"
              >
                <span className="settings-glyph" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              {settingsOpen && (
                <div className="settings-panel" id="settings-panel" role="group" aria-label="Reading settings">
                  <div className="settings-head">
                    <span>Reading settings</span>
                    <span className="settings-live">Profile {profile.toUpperCase()}</span>
                  </div>
                  <fieldset className="settings-fieldset">
                    <legend>Performance</legend>
                    <div className="profile-grid">
                      {profileOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`profile-option ${profileSetting === option.id ? 'is-selected' : ''}`}
                          onClick={() => setProfileSetting(option.id)}
                          aria-pressed={profileSetting === option.id}
                        >
                          <span className="profile-letter">{option.letter}</span>
                          <span className="profile-copy">
                            <strong>{option.label}</strong>
                            <small>{option.note}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="settings-row">
                    <div>
                      <span className="settings-label">Reduce motion</span>
                      <small className="settings-note">
                        {motionOverride === null ? 'Following your system setting' : 'Set for this site'}
                      </small>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={reducedMotion}
                      aria-label="Reduce motion"
                      className={`switch ${reducedMotion ? 'is-on' : ''}`}
                      onClick={() => setMotionOverride(!reducedMotion)}
                    >
                      <span />
                    </button>
                  </div>
                  {motionOverride !== null && (
                    <button
                      type="button"
                      className="text-button settings-reset"
                      onClick={() => setMotionOverride(null)}
                    >
                      Use system motion preference
                    </button>
                  )}
                  <p className="settings-footnote">
                    Essential mode lowers illustration detail and pauses scroll animation. Preferences are
                    stored only on this device.
                  </p>
                  {audioError && <p className="settings-audio-error">{audioError}</p>}
                </div>
              )}
            </div>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="scroll-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <p className="mobile-menu-kicker">Contents</p>
          <nav aria-label="Mobile">
            {links.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  go(link.id);
                }}
              >
                <span className="mobile-link-index">{String(index + 1).padStart(2, '0')}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="mobile-menu-meta">
            <button
              type="button"
              className="text-button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                toggleAudio();
              }}
            >
              <span className={`mini-sound ${audioEnabled ? 'is-on' : ''}`} aria-hidden="true" />
              {audioEnabled ? 'Mute ambience' : 'Play ambience'}
            </button>
            <p>
              Profile {profile.toUpperCase()} · {reducedMotion ? 'Reduced motion' : 'Full motion'}
            </p>
            <a
              className="mobile-about-link"
              href="#about"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(event) => {
                event.preventDefault();
                go('about');
              }}
            >
              About this edition
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`mobile-menu-scrim ${menuOpen ? 'is-open' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <span className="sr-only" aria-live="polite">
        {audioError ?? ''}
      </span>
    </>
  );
}
