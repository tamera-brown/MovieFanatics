import MovieCard from "../../components/MovieCard/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import {useSnackbar} from 'notistack'
import { Button } from "@material-ui/core";

const WatchList=()=>{
  
    const wacthListData=state=>state.watchList
    const watchList=useSelector(wacthListData)
    const dispatch = useDispatch()
  const {enqueueSnackbar}=useSnackbar()

    function RemovefromWatchList(movie){
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', 
        movieId:movie.id,
        
    })

    enqueueSnackbar(`${movie.title || movie.name} removed from watchlist`,{
      variant:'error',
      anchorOrigin:{
        vertical:'top',horizontal:'center',
      },
    });
    }
    return (
        <div>
          <span className="pageTitle">Watch List</span>

          <div className="trending">
            
          
          {watchList &&
          watchList.map((c) => (
            
       <MovieCard
              key={c.id}
              id={c.id}
              poster={c.poster}
              title={c.title}
              date={c.date}
              media_type={c.media_type} />
              
             
      ))}
       
        

</div>

</div>
      );
}; export default WatchList;
