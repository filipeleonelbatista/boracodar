import { useEffect, useState } from 'react';
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import styles from './App.module.css';
import * as dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration)

function App() {
  const playlist = [
    {
      title: "Kill me",
      artist: "Alok",
      cover: './alokCover.jpg',
      source: "./alok.mp3"
    },
    {
      title: "Acorda Pedrinho",
      artist: "Jovem Dionísio",
      cover: './pedrinhoCover.jpg',
      source: "./acorda-pedrinho.mp3"
    },
    {
      title: "Stygia",
      artist: "Alissa White-Gluz OST Metal Hellsinger",
      cover: './metalCover.jpg',
      source: "metal.mp3"
    },
  ]
  const [isUserInteract, setIsUserInteract] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(playlist[0].source))
  const [coverImage, setCoverImage] = useState(playlist[0].cover);
  const [title, setTitle] = useState(playlist[0].title);
  const [artist, setArtist] = useState(playlist[0].artist);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [percentual, setPercentual] = useState(0);

  const handleNext = () => {
    setIsUserInteract(true)
    handlePause();
    if (currentIndex + 1 < playlist.length) {
      setAudio(new Audio(playlist[currentIndex + 1].source))
      setCoverImage(playlist[currentIndex + 1].cover)
      setTitle(playlist[currentIndex + 1].title)
      setArtist(playlist[currentIndex + 1].artist)
      setCurrentIndex(currentIndex + 1)
    } else {
      alert("Sua lista terminou!")
      handlePause();
    }
  }

  const handlePause = () => {
    setIsUserInteract(true)
    audio.pause()
    setIsPlaying(false)
  }
  const handlePlay = () => {
    setIsUserInteract(true)
    audio.play()
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    setIsUserInteract(true)
    handlePause();
    if (currentIndex > 0) {
      setAudio(new Audio(playlist[currentIndex - 1].source))
      setCoverImage(playlist[currentIndex - 1].cover)
      setTitle(playlist[currentIndex - 1].title)
      setArtist(playlist[currentIndex - 1].artist)
      setCurrentIndex(currentIndex - 1)
    } else {
      if (confirm("Sua Lista está na primeira musica, deseja continuar ouvindo?")) {
        handlePlay()
      } else {
        handlePause()
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const per = (100 * audio.currentTime) / audio.duration;
      if (per <= 100) {
        setPercentual(per)
      }
      if (per === 100) {
        setPercentual(0)
        handleNext()
      }
      if (duration === 0) {
        setDuration(audio.duration)
      }
      setPlayed(audio.currentTime)
    }, 1000)
  })

  useEffect(() => {
    if (isUserInteract) {
      handlePlay()
    }
  }, [audio.src])

  return (
    <div className={styles.App}>
      <div className={styles.row}>
        <div className={styles.containerFull}>
          <div className={styles.containerImage}>
            <img
              alt={artist}
              src={coverImage} />
          </div>
          <div className={styles.songData}>
            <h1>{title}</h1>
            <p>{artist}</p>
          </div>
          <div className={styles.controles}>
            <button onClick={handlePrevious}>
              <MdSkipPrevious size={28} />
            </button>

            {isPlaying ? <button onClick={handlePause}><MdPause size={28} /></button> : <button onClick={handlePlay}><MdPlayArrow size={28} /></button>}

            <button onClick={handleNext}>
              <MdSkipNext size={28} />
            </button>
          </div>
          <div className={styles.progression}>
            <div className={styles.progress}>
              <div className={styles.progressConcluded} style={{ width: `${percentual}%` }}>
              </div>
            </div>
            <div className={styles.progressTimers}>
              <p>{dayjs().startOf('day').add(played, 'seconds').format('mm:ss')}</p>
              <p>{dayjs().startOf('day').add(duration, 'seconds').format('mm:ss')}</p>
            </div>
          </div>
        </div>

        <div className={styles.column}>

          <div className={styles.containerFull}>
            <div className={styles.songCoverInfo}>
              <div className={styles.containerImageSmall}>
                <img
                  alt={artist}
                  src={coverImage} />
              </div>
              <div className={styles.songData}>
                <h1>{title}</h1>
                <p>{artist}</p>
              </div>
            </div>
            <div className={styles.controles}>
              <button onClick={handlePrevious}>
                <MdSkipPrevious size={28} />
              </button>

              {isPlaying ? <button onClick={handlePause}><MdPause size={28} /></button> : <button onClick={handlePlay}><MdPlayArrow size={28} /></button>}

              <button onClick={handleNext}>
                <MdSkipNext size={28} />
              </button>
            </div>
            <div className={styles.progression}>
              <div className={styles.progress}>
                <div className={styles.progressConcluded} style={{ width: `${percentual}%` }}>
                </div>
              </div>
              <div className={styles.progressTimers}>
                <p>{dayjs().startOf('day').add(played, 'seconds').format('mm:ss')}</p>
                <p>{dayjs().startOf('day').add(duration, 'seconds').format('mm:ss')}</p>
              </div>
            </div>
          </div>


          <div className={styles.containerFull}>
            <div className={styles.songCoverInfo}>
              <div className={styles.containerImageSmall}>
                <img
                  alt={artist}
                  src={coverImage} />
              </div>
              <div className={styles.songData}>
                <h1>{title}</h1>
                <p>{artist}</p>
              </div>
            </div>
            <div className={styles.controles}>
              <button onClick={handlePrevious}>
                <MdSkipPrevious size={28} />
              </button>
              {isPlaying ? <button onClick={handlePause}><MdPause size={28} /></button> : <button onClick={handlePlay}><MdPlayArrow size={28} /></button>}
              <button onClick={handleNext}>
                <MdSkipNext size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
