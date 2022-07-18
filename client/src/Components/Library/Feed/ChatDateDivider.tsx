import React from 'react'
import dateFormat from 'dateformat';

interface Props {
    newDate: string
}

export default function ChatDateDivider(props: Props){
    let date = dateFormat(props.newDate, "dddd, mmmm dS")
    return(
        <div style={{display:'flex', justifyContent: 'center', marginBottom:'15px'}}>
            <div style={{height: '50%', borderBottom: '1px solid #efff0a', flexGrow: '1', marginRight: '10px'}}></div>
            <p style={{marginTop: '5px', marginBottom: '5px', color: '#efff0a', fontSize: '12px'}}>
                {date}
            </p>
            <div style={{height: '50%', borderBottom: '1px solid #efff0a', flexGrow: '1', marginLeft: '10px'}}></div>
        </div>
    )
}