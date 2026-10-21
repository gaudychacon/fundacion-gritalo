import { useState, useEffect } from 'react';
import { Play, Clock, X } from 'lucide-react';
import { Illustration } from '../common/Illustration';

export function VideoCard({ video }) {
  const [active, setActive] = useState(false);

  const valid = /^[a-zA-Z0-9_-]{11}$/.test(video.youtubeId || '');
  const hasMp4 = Boolean(video.archivo);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <>
      <article className="video-card">
        <Illustration
          src={video.thumbnail}
          label="Ilustración del video"
          variant="video"
        />

        <div className="card-content">
          <span className="eyebrow">{video.tema}</span>
          <h2>{video.titulo}</h2>
          <p>{video.descripcion}</p>

          {hasMp4 || valid ? (
            <>
              <button
                className="button primary"
                onClick={() => setActive(true)}
              >
                <Play size={18} />
                Reproducir video
              </button>

              {valid && !hasMp4 && (
                <p className="small">
                  Al reproducir, se conecta con YouTube,
                  un servicio externo.
                </p>
              )}
            </>
          ) : (
            <span className="coming-soon">
              <Clock size={16} />
              Video próximamente
            </span>
          )}
        </div>
      </article>

      {active && (
        <div
          className="video-modal-overlay"
          onClick={() => setActive(false)}
        >
          <section
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={video.titulo}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="video-modal-header">
              <div>
                <span className="eyebrow">{video.tema}</span>
                <h2>{video.titulo}</h2>
              </div>

              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActive(false)}
                aria-label="Cerrar video"
                title="Cerrar video"
              >
                <X size={24} />
              </button>
            </div>

            <div className="video-modal-player">
              {hasMp4 ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  src={video.archivo}
                  aria-label={video.titulo}
                >
                  Tu navegador no puede reproducir este video.
                </video>
              ) : valid ? (
                <iframe
                  title={video.titulo}
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : null}
            </div>

            <p className="video-modal-description">
              {video.descripcion}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
