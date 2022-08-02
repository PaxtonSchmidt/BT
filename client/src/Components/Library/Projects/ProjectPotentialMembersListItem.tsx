import React, { useState } from 'react'
import { Teammate } from '../../../API/interfaces/teammate';
import check from '../../Images/Icons/check-lg.svg';
import plus from '../../Images/Icons/plus-lg.svg';

interface Props{
    member: Teammate;
    setIsMemberOnList: (member: Teammate) => void;
}

export default function ProjectPotentialMembersListItem(props: Props) {
    const [isSelected, setIsSelected] = useState(false);
    
    function handleSelect(){
        setIsSelected(!isSelected)
        props.setIsMemberOnList(props.member)
    }

    return (
        <div className='ListContainer'>
            <div className='listItem listRow memberRow' style={{justifyContent: 'space-between', cursor: 'default'}}>
                <div className='memberListRowSection' style={{textAlign: 'center'}}>
                    <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                        {props.member.username } 
                    </span>
                    <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content'}}>
                      #{props.member.discriminator}
                    </span>
                </div>
                <div className='memberListRowSection' style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'8px'}}>
                    <div onClick={() => handleSelect()} className='rowItem' style={{cursor: 'pointer'}}>
                        {isSelected ? 
                        <div className='selectFromListButton scaleY fadeIn' style={{backgroundColor: 'green'}}>
                            <img style={{height: 'fit-content'}} src={check} />
                            <p style={{marginTop: '5px', marginBottom: '5px'}}>Added</p>
                        </div>
                        :
                        <div className='selectFromListButton scaleYonHover fadeIn' >
                            <img style={{height: 'fit-content'}} src={plus} />
                            <p style={{marginTop: '5px', marginBottom: '5px'}}>Add</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
