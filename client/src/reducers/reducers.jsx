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
        const index = state.watchList.findIndex((list) =>
                list.id === action.movieId);

            let newCart = [...state.watchList];

            if (index >= 0) {
                newCart.splice(index, 1);
            }
            else {
                console.warn('cant remove from the cart')
            }
            return {
                ...state,
                watchList: newCart
            };
        case "EMPTY_WATCHLIST":
            return{
                ...state,
                watchList:[]
            }
      default:
       
        return state
    }
  }