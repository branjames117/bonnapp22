import { useEffect, useState } from 'react'
import classes from './Video.module.css'
import Card from '../../components/layout/Card'
import Headline from '../layout/Headline'

export default function Video(props) {
  const [activeVideo, setActiveVideo] = useState(0)

  /* set active video back to 0 on new profile load */
  useEffect(() => {
    setActiveVideo(0)
  }, [props])

  return (
    <Card>
      <Headline>Check Out Their Music</Headline>
      {activeVideo === 0 && (
        <div className={classes.videoContainer}>
          <div />
          <div className={classes.video}>
            <iframe
              className={classes.iframe}
              allowFullScreen='allowfullscreen'
              width='100%'
              src={`${props.videos[0].replace(
                'watch?v=',
                'embed/'
              )}?playsinline=1`}
              title='YouTube video player'
              allow='accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            ></iframe>
          </div>
          <div className={classes.nextVideo} onClick={() => setActiveVideo(1)}>
            &gt;
          </div>
        </div>
      )}
      {activeVideo === 1 && (
        <div className={classes.videoContainer}>
          <div className={classes.prevVideo} onClick={() => setActiveVideo(0)}>
            &lt;
          </div>
          <div className={classes.video}>
            <iframe
              className={classes.iframe}
              allowFullScreen='allowfullscreen'
              width='100%'
              height='450px'
              src={`${props.videos[1].replace(
                'watch?v=',
                'embed/'
              )}?playsinline=1`}
              title='YouTube video player'
              allow='accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            ></iframe>
          </div>
          <div className={classes.nextVideo} onClick={() => setActiveVideo(2)}>
            &gt;
          </div>
        </div>
      )}
      {activeVideo === 2 && (
        <div className={classes.videoContainer}>
          <div className={classes.prevVideo} onClick={() => setActiveVideo(1)}>
            &lt;
          </div>
          <div className={classes.video}>
            <iframe
              className={classes.iframe}
              allowFullScreen='allowfullscreen'
              width='100%'
              height='450px'
              src={`${props.videos[2].replace(
                'watch?v=',
                'embed/'
              )}?playsinline=1`}
              title='YouTube video player'
              allow='accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            ></iframe>
          </div>
          <div />
        </div>
      )}
    </Card>
  )
}
