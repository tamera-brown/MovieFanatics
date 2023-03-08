const initialState = {
    watchList:[],
    currentUser:null,
    isAuthenticated:false
}
// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
   
    switch (action.type) {
        case "USER_SIGN_IN":
        return{
            ...state,
            currentUser:action.currentUser,
            isAuthenticated:true
        }
      case "USER_SIGN_OUT":
        sessionStorage.removeItem('Authorization')
        return{
            ...state,
            currentUser:null,
            isAuthenticated:false
        }

      case "ADD_TO_WATCHLIST": 
             return{
                ...state,
                watchList:[...state.watchList,action.movie]
            };
        
       
      case "REMOVE_FROM_WATCHLIST":
            return{
                watchList:[
                    ...state.watchList.filter(movie=>movie.id!==action.movieId)
                ]
            }
        case "EMPTY_WATCHLIST":
            return{
                ...state,
                watchList:[]
            }
      default:
       
        return state
    }
  }