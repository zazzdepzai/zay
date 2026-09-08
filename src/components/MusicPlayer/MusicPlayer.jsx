import React from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3 } from 'lucide-react'
import { useMusic } from '../../hooks/useMusic'
import './MusicPlayer.css'

function MusicPlayer({ playlist = [] }) {
  const {
    audioRef,
    currentTrack,
    playing,
    volume,
    duration,
    currentTime,
    muted,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute
  } = useMusic(playlist)

  if (!playlist.length || !currentTrack) {
    return null
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} crossOrigin="anonymous" />
      
      <div className="player-header">
        <Disc3 size={14} className={playing ? 'playing' : ''} />
        <span className="now-playing">Now Playing</span>
      </div>

      <div className="player-track">
        <div className="track-info">
          <div className="track-title">{currentTrack.title}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>
      </div>

      <div className="player-progress">
        <span className="time current">{formatTime(currentTime)}</span>
        <div
          className="progress-bar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percent = x / rect.width
            seek(percent * duration)
          }}
        >
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}>
            <div className="progress-handle"></div>
          </div>
        </div>
        <span className="time duration">{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button onClick={prev} className="control-btn" title="Previous">
          <SkipBack size={16} />
        </button>
        <button onClick={togglePlay} className="control-btn play" title={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={next} className="control-btn" title="Next">
          <SkipForward size={16} />
        </button>
        <div className="volume-control">
          <button onClick={toggleMute} className="control-btn" title={muted ? 'Unmute' : 'Mute'}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={muted ? 0 : volume * 100}
            onChange={(e) => setVolume(e.target.value / 100)}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
