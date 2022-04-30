const initialState = {
    watchList:[]
}
// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
   
    switch (action.type) {
      case "ADD_TO_WATCHLIST": 

        if(state.watchList.includes(action.movie)){
            console.warn("already added to watch list")
        }
        
            return{
            
                ...state,
                watchList:[...state.watchList,action.movie]
            };
        
       
      case "REMOVE_FROM_WATCHLIST":
          const index=state.watchList.findIndex((movie)=>
              movie.movieId === action.movieId);

              let newWatchList=[...state.watchList]

              if(index>=0){
                  newWatchList.splice(index,1)
              }else{
                  console.warn("Cannot remove from watch list")
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