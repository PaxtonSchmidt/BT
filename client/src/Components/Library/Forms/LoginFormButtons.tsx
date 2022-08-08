import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../Breakpoints';
import gitHub from '../../Images/Icons/github.svg';

export const LoginFormButtons: React.FC = () => {
    const navigate = useNavigate();
    const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
    
    function handleSignUpClick() {
        navigate('../SignUp');
    }
    function handleDemoClick() {
        navigate('../DemoApp');
    }
    function handleGitHubClick() {
        window.location.href = 'https://github.com/PaxtonSchmidt/BT';
    }

    return (
    <>
    <button
        onClick={handleSignUpClick}
        className={`button scaleYonHover hoverGrey button-border ${windowWidth < BreakPoints.tablet ? 'button-tb' : ''}`}
        style={{ margin: '2px 2px 0px 0px'}}>
        Sign Up
    </button>
    <button
        onClick={handleGitHubClick}
        className={`button scaleYonHover hoverGrey button-border ${windowWidth < BreakPoints.tablet ? 'button-tb' : ''}`}
        style={{ margin: '2px 2px 0px 0px' }}>
        <img src={gitHub} alt='go to code' />
    </button>
    <button
        onClick={handleDemoClick}
        className={`button scaleYonHover hoverGrey button-border ${windowWidth < BreakPoints.tablet ? 'button-tb' : ''}`}
        style={{ margin: '2px 2px 0px 0px' }}>
        Demo
    </button>
    </>
    )
}