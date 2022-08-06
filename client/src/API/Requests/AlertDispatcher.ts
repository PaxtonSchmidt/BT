//takes in the fireAlert action creator instance, 
//the response.error and hide alert action creator instance from a component
export default function alertDispatcher(fireActionCreator: any, error: any, hideActionCreator: any){
    fireActionCreator({isOpen: true, status: error.status, message: error.message})
    setTimeout(hideActionCreator, 6000)
}