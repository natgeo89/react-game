import React from 'react';
import rss from '../assets/images/rss.svg';

export default function Footer() {

  return (
    <div className='footer'>
      Created by<a className='footer-link' href='https://github.com/natgeo89' rel='noreferrer' target='_blank'>Viktar Sakharuk</a>
      for
      <a className='footer-link' href='https://rs.school/js/' rel='noreferrer' target='_blank'><img className='footer-image' src={rss}
        alt='Rolling Scope School'/></a>
      <span>2021</span>
    </div>
  )
}