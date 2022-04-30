import MovieCard from "../../components/MovieCard/MovieCard";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useSelector } from "react-redux";


const WatchList=()=>{
    const wacthListData=state=>state.watchList
    const watchList=useSelector(wacthListData)
    
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
          media_type={c.media_type}
        />
        
   
      ))}
          </div>
    
        </div>
      );
}; export default WatchList;