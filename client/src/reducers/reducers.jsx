const initialState = {
    watchList:[]
}
// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
   
    switch (action.type) {
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