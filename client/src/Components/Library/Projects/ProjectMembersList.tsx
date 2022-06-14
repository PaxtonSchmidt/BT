import React from 'react'
import ProjectMembersListItem from './ProjectMembersListItem'

export default function ProjectMembersList() {

    return (
        <>
            <div className='listRow' >
                    <div className='memberListRowSection'>
                        <span className='rowItem'>
                            Member
                        </span>
                    </div>
                    <div className='memberListRowSection'>
                        <span className='rowItem'>
                            Role
                        </span>
                    </div>
                </div>

            <div id='list'  className='list projectMembersList componentGlow'>
                
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
                <ProjectMembersListItem />
            </div>
        </>
    )
}
    


