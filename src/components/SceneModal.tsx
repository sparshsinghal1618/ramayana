import { getCharacter } from '../data/characters';
import { getLocation } from '../data/locations';
import type { Chapter } from '../data/types';
import { SceneArt } from '../art/SceneArt';
import { useExperience } from '../experience/ExperienceContext';
import { Modal } from './Modal';
import { sceneFigures, timeLabels, chapterLabel } from '../data/visuals';

interface SceneModalProps {
  chapter: Chapter;
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onCharacter?: (id: string) => void;
  onLocation?: (id: string) => void;
}

export function SceneModal({
  chapter,
  index,
  onClose,
  onNavigate,
  onCharacter,
  onLocation,
}: SceneModalProps) {
  const { quality } = useExperience();
  const open = index !== null;
  const scene = index !== null ? chapter.scenes[index] : undefined;
  const location = scene ? getLocation(scene.location) : undefined;
  const characters = scene
    ? scene.characters.map((id) => getCharacter(id)).filter(Boolean)
    : [];

  return (
    <Modal
      open={open && Boolean(scene)}
      onClose={onClose}
      labelledBy="scene-modal-title"
      className="scene-modal"
    >
      {scene && index !== null && (
        <div className="scene-modal-body">
          <div className="scene-modal-art">
            <SceneArt
              motif={scene.motif}
              palette={chapter.palette}
              time={scene.time}
              seed={scene.id}
              figures={sceneFigures(scene)}
              quality={quality}
              title={`Illustration for ${scene.title}`}
            />
            <div className="scene-modal-art-meta">
              <span>{chapterLabel(chapter.number)}</span>
              <span>
                Scene {String(scene.number).padStart(2, '0')} / {String(chapter.scenes.length).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="scene-modal-copy">
            <p className="eyebrow">
              {chapter.title} <span aria-hidden="true">·</span> {timeLabels[scene.time]}
            </p>
            <h2 id="scene-modal-title">{scene.title}</h2>
            <p className="scene-modal-narrative">{scene.narrative}</p>
            {scene.context && (
              <div className="tradition-note">
                <span className="tradition-note-label">Tradition note</span>
                <p>{scene.context}</p>
              </div>
            )}
            <dl className="scene-modal-meta">
              {location && (
                <div>
                  <dt>Place</dt>
                  <dd>
                    <button
                      type="button"
                      className="inline-link"
                      onClick={() => {
                        onLocation?.(location.id);
                      }}
                    >
                      {location.name}
                    </button>
                  </dd>
                </div>
              )}
              <div>
                <dt>Hour</dt>
                <dd>{timeLabels[scene.time]}</dd>
              </div>
              <div>
                <dt>Palette</dt>
                <dd>{chapter.palette}</dd>
              </div>
            </dl>
            {characters.length > 0 && (
              <div className="scene-modal-characters">
                <p className="eyebrow">Figures in this scene</p>
                <div className="chip-row">
                  {characters.map((character) => (
                    <button
                      key={character!.id}
                      type="button"
                      className="chip chip-button"
                      onClick={() => {
                        onClose();
                        onCharacter?.(character!.id);
                      }}
                    >
                      {character!.name}
                      <span lang="sa">{character!.devanagari}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="scene-modal-nav">
              <button
                type="button"
                className="scene-nav-button"
                onClick={() => onNavigate(Math.max(0, index - 1))}
                disabled={index === 0}
              >
                <span className="scene-nav-direction">← Previous</span>
                <span>{index > 0 ? chapter.scenes[index - 1].title : 'Beginning of the book'}</span>
              </button>
              <button
                type="button"
                className="scene-nav-button scene-nav-next"
                onClick={() => onNavigate(Math.min(chapter.scenes.length - 1, index + 1))}
                disabled={index === chapter.scenes.length - 1}
              >
                <span className="scene-nav-direction">Next →</span>
                <span>
                  {index < chapter.scenes.length - 1
                    ? chapter.scenes[index + 1].title
                    : 'End of the book'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
