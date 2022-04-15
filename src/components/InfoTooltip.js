import React from 'react';
import Popup from './Popup';
import { registrationStatuses } from '../utils/constants';

const InfoTooltip = (props) => {
  const { isOpen, status } = props

  return(
    <Popup name='info' isOpen={isOpen}>
      <img src={status.image} alt={status.alt} className='info__image' /> 
      <p className='info__text'>{status.text}</p>
    </Popup>
        
  )
}

export default InfoTooltip