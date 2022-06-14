import React from 'react';

interface Props{
    name: string;
    isSelected: boolean;
}

export default function ProjectListItem(props: Props) {
    return (
        <div className='sideScrollListItem scaleYonHover' >
            {props.name}
        </div>
    )
}