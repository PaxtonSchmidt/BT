//example from redux docs
export let thing = '';
// function createStore(initialState = {}, reducer) {
//     let stateTree = initialState
//     let currentReducer = reducer
//     let listeners = []
//     function getState() {
//         return stateTree
//     }
//     function dispatch(action) {
//       stateTree = currentReducer(stateTree, action)
//       listeners.forEach(listener => listener())
//       return action
//     }
//     function subscribe(newListener) {
//       listeners.push(newListener)
//       return function unsubscribe() {
//         const index = listeners.indexOf(listener)
//         listeners.splice(index, 1)
//       }
//     }
//     return { getState, dispatch, subscribe }
//   }
//   function songReducer(state = {}, action) {
//     switch(action.type) {
//       case "CHANGE_SONG":
//         return {
//           ...state,
//           currentSong: action.song,
//           isPlaying: true,
//         }
//       case "PAUSE_SONG":
//         return {
//           ...state,
//           isPlaying: false,
//         }
//       case "PLAY_SONG":
//         return {
//           ...state,
//           isPlaying: true,
//         }
//       default:
//         return state
//     }
//   }
//   const store = createStore({}, songReducer)
//   store.subscribe(() => console.log(store.getState()))
//   store.dispatch({
//     type: "CHANGE_SONG",
//     song: {
//       id: 3,
//       title: "Hips Don't Lie",
//       artist: "Shakira"
//     }
//   })
//   store.dispatch({ type: "PAUSE_SONG" })
//   store.dispatch({ type: "PLAY_SONG" })
//   store.dispatch({ type: "PAUSE_SONG" })
//   store.dispatch({ type: "PLAY_SONG" })
  