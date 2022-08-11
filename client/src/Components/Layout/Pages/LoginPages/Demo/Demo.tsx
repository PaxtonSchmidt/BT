import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { State } from '../../../../../Redux/reducers'
import explore from '../../../../Images/Pic/explore.svg'
import { BreakPoints } from '../../../../Library/Breakpoints'
import { DemoAccount } from './DemoAccount'
import { DemoCharacters } from './DemoCharacters'
import bug from '../../../../Images/Icons/bug.svg' 

interface Props {
}

export const Demo: React.FC<Props> = () => {
    const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
    const navigate = useNavigate()
    let conditionalBodyPadding: string = windowWidth > BreakPoints.tablet ? '10%' : '10px'
    let cardGridColumns: string = windowWidth > BreakPoints.mobile ? '1fr 1fr 1fr' : '1fr'

    useEffect(() => {
        let isDemo = window.sessionStorage.getItem('isDemo') === 'true'
        if(isDemo === true){
            window.location.reload();
            sessionStorage.setItem('isDemo', 'false')
        }
    }, [])
    return(
    <div className='demoPageBody altBG' style={{display: 'flex', flexDirection: 'column', paddingTop: `${windowWidth > BreakPoints.tablet ? '150px' : '75px'}` , paddingLeft: `${conditionalBodyPadding}`, paddingRight: `${conditionalBodyPadding}`, color: 'white', justifyContent: 'start'}}>
        <img onClick={()=>navigate('/login')} src={bug} style={{height: '20px', width: '20px', position: 'absolute', top: '20px', left: '0', right: '0', margin: '0 auto'}}/> 
        <header style={{width: '100%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{height: `150px`, borderBottom: '1px solid #ffffff31', display:'flex', flexDirection: 'row', flexBasis: '0', justifyContent: 'space-between', paddingRight: `${windowWidth > BreakPoints.mobile ? '20px' : '' }`}}>
                <div style={{paddingBottom: '24px', flex: '1', textAlign: `${windowWidth > BreakPoints.mobile ? 'left':'center'}`}}>
                    {windowWidth > BreakPoints.tablet && <h3 style={{marginTop:'0px', marginBottom: '0px'}}>Demo</h3>}
                    <h2 style={{flex: '1', fontSize: `${windowWidth > BreakPoints.tablet ? '24px' : '20px'}`, marginBottom: '12px', marginTop:`${windowWidth > BreakPoints.mobile ? '40px' : '30px'}`}}>
                        Choose how you want to experience BugTracker
                    </h2>
                    <p style={{opacity: '70%', marginBottom: '0px'}}>and explore the application with no commitment</p>
                </div>
                {windowWidth > BreakPoints.mobile ? <img src={explore} style={{height: '100%', float: 'right'}} /> : <></>}
            </div>
        </header>
        <section style={{width: '100%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{paddingBottom: '24px', flex: '1', borderBottom: '1px solid #ffffff31'}}>
                <h3 style={{marginTop:'24px', marginBottom: '0px'}}>Users</h3>
                <p style={{opacity: '70%', marginBottom: '0px'}}>Each account represents someone that can benefit from BugTracker</p>

                <div style={{display: 'grid', gridTemplateColumns: `${cardGridColumns}`, gridTemplateRows: `${windowWidth > BreakPoints.mobile ? 'repeat(1, 225px)' : 'repeat(3, 100px)' }` , gap: '5px', marginTop: '24px'}}>
                    <DemoAccount windowWidth={windowWidth} character={DemoCharacters.Jessie} />
                    <DemoAccount windowWidth={windowWidth} character={DemoCharacters.Jamie} />
                    <DemoAccount windowWidth={windowWidth} character={DemoCharacters.Jordan} />
                </div>
            </div>
        </section>
        <nav style={{width: '100%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '24px'}}>
            <button onClick={()=>navigate('/login')} className='scaleYonHover hoverGrey button' style={{width: '100px', borderRadius: '5px'}}>
                Back to login
            </button>
        </nav>
    </div>
    )
}