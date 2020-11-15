/* eslint-disable max-len */
import React from 'react';

/**
 * Fogging animation.
 * @return {React} Animation.
 */
export default function FogAnimation() {
  return (
    <>
      <div id='foglayer_01' className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
      <div id='foglayer_02' className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
      <div id='foglayer_03' className='fog'>
        <div className='image01'></div>
        <div className='image02'></div>
      </div>
    </>
  );
};
