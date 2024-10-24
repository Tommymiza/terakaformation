import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ActContext } from '../../App';

export default function Home() {
  const { t } = useContext(ActContext);
  return (
    <div id='home'>
      <div className='caroussel'>
      <Carousel
              showThumbs={false}
              autoPlay={true}
              interval={3000}
              transitionTime={2000}
              infiniteLoop={true}
              showIndicators={false}
            >
                <img
                  src="/images/home-1.jpeg"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <img
                  src="/images/home-2.jpeg"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
            </Carousel>
      </div>
      <h3>{t('home.head')}</h3>
      <p>{t('home.description')}</p>
    </div>
  )
}
