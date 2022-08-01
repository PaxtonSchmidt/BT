import React from 'react'
import arrow from '../../Images/Icons/arrow-up-short.svg'

interface Props {
    isSortReversed: boolean;
}

export default function sortArrow(props: Props){
    return (
        <img src={arrow} className={`fadeIn ${props.isSortReversed ? 'twist' : ''}`} style={{position: 'absolute'}}/>
    )
}