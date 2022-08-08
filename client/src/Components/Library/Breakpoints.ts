interface BreakPoints {
    mobile: number,
    tablet: number,
    small: number,
    medium: number,
    large: number
}
interface BreakPointsNames {
    mobile: string,
    tablet: string,
    small: string,
    medium: string,
    large: string
}

export const BreakPoints: BreakPoints = {
    mobile: 480,
    tablet: 768,
    small: 1024,
    medium: 1200,
    large: 1201
}
export const BreakPointsNames: BreakPointsNames = {
    mobile: 'mobile',
    tablet: 'tablet',
    small: 'small',
    medium: 'medium',
    large: 'large'
}

export function getBreakpointName(n: number): string{
    if(n === 0 || n <= BreakPoints.mobile){
      return BreakPointsNames.mobile
    } else if(n > BreakPoints.mobile && n <= BreakPoints.tablet){
      return BreakPointsNames.tablet
    } else if(n > BreakPoints.tablet && n <= BreakPoints.small){
      return BreakPointsNames.small
    } else if(n > BreakPoints.small && n <= BreakPoints.medium){
      return BreakPointsNames.medium
    } else if(n >  BreakPoints.medium){
      return BreakPointsNames.large
    } else {
      return BreakPointsNames.small //best guess
    }
}