import React, { useEffect } from 'react'
import ProjectMembersList from '../../../Library/Projects/ProjectMembersList'

export default function ProjectMembersManage(){

    useEffect(() => console.log('get project members data'))


    return(
        <div className='ManageMembersWidget'>
            <ProjectMembersList />
        </div>
    )
}