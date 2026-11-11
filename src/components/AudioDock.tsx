import { useState } from 'react';
import { ambienceLabels, type Ambience } from '../audio/AudioEngine';
import { useExperience } from '../experience/ExperienceContext';

const ambiences = Object.keys(ambienceLabels) as Ambience[];

export function AudioDock() {
  const {
    audioEnabled,
    audioSupported,
    audioError,
    toggleAudio,
    volume,
    setVolume,
    ambience,
    setAmbience,
  } = useExperience();
  const [open, setOpen] = useState(false);
  const detail = ambienceLabels[ambience];

  return (
    <aside className={`audio-dock ${open ? 'is-open' : ''} ${audioEnabled ? 'is-playing' : ''}`}>
      {open && (
        <div className="audio-panel" id="audio-panel">
          <div className="audio-panel-head">
            <span className="audio-kicker">Sound of the telling</span>
            <button
              type="button"
              className="audio-close"
              aria-label="Collapse sound panel"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="audio-main">
            <button
              type="button"
              className={`audio-play ${audioEnabled ? 'is-on' : ''}`}
              onClick={toggleAudio}
              aria-pressed={audioEnabled}
              disabled={!audioSupported}
            >
              <span className="audio-play-icon" aria-hidden="true">
                {audioEnabled ? <span className="pause-glyph" /> : <span className="play-glyph" />}
              </span>
              <span>
                <strong>{audioEnabled ? 'Ambience is on' : 'Listen, if you wish'}</strong>
                <small>{audioEnabled ? 'Tap to mute' : 'Nothing plays until you choose'}</small>
              </span>
            </button>
            <label className="volume-row">
              <span>Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                onChange={(event) => setVolume(Number(event.target.value) / 100)}
                aria-label="Ambience volume"
              />
              <span className="volume-value">{Math.round(volume * 100)}</span>
            </label>
          </div>
          <div className="ambience-list" role="group" aria-label="Ambience">
            {ambiences.map((key) => (
              <button
                key={key}
                type="button"
                className={ambience === key ? 'is-selected' : ''}
                onClick={() => setAmbience(key)}
                aria-pressed={ambience === key}
              >
                {ambienceLabels[key].label}
              </button>
            ))}
          </div>
          <p className="audio-description">{detail.description}</p>
          <p className="audio-note">
            Every sound is synthesised in your browser. No recordings, no autoplay, no requests.
          </p>
          {audioError && <p className="audio-error">{audioError}</p>}
          {!audioSupported && (
            <p className="audio-error">This browser does not expose the Web Audio API.</p>
          )}
        </div>
      )}
      <button
        type="button"
        className="audio-pill"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="audio-panel"
        aria-label={open ? 'Close sound panel' : 'Open sound panel'}
      >
        <span className={`audio-bars ${audioEnabled ? 'is-active' : ''}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="audio-pill-label">{audioEnabled ? detail.label : 'Sound off'}</span>
        <span className="audio-chevron" aria-hidden="true">
          {open ? '↓' : '↑'}
        </span>
      </button>
    </aside>
  );
}
