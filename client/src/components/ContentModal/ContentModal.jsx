import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import More from "@material-ui/icons/More";
import StarOutlined from "@material-ui/icons/StarBorderOutlined"
import ReactStars from "react-rating-stars-component";
import {useSnackbar} from 'notistack'
import axios from "axios";
import {
  API_KEY,
  API_URL,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import { useDispatch, useSelector} from 'react-redux'
import VideoModal from "../VideoModal/VideoModal";
import WatchList from "../../Pages/WatchList/WatchList";



const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [providers,setProviders]=useState();
  const dispatch = useDispatch()
  const {enqueueSnackbar}=useSnackbar()
  const [traileropen, setTrailerOpen] = useState(false);
  const wacthListData=state=>state.watchList
  const watchList=useSelector(wacthListData)


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTrailerOpen= () => {
    setTrailerOpen(true);
  };
  const handleTrailerClose= () => {
    setTrailerOpen(false);
  };
  const AddToWatchlist=(movie)=>{
    const movieExists = watchList.find(element => {
      if (element.id === movie.id) {
        return true;
      }
    
      return false;
    });
    
    
    
    if (movieExists !== undefined) {
      enqueueSnackbar(`${movie.title || movie.name} already in watchlist`,{
        variant:'error',
        anchorOrigin:{
          vertical:'top',horizontal:'center',
        },
      });
    }else{
  dispatch({ type: 'ADD_TO_WATCHLIST', 
  movie:{
      id:movie.id,
      poster:movie.poster_path,
      title:movie.title || movie.name,
      media_type:movie.title ? "movie" : "tv",
      backdrop:movie.backdrop_path,
      date: movie.first_air_date || movie.release_date,
      rating:movie.vote_average



  } })
  enqueueSnackbar(`${movie.title || movie.name} added to watchlist`,{
    variant:'success',
    anchorOrigin:{
      vertical:'top',horizontal:'center',
    },
  });
    }

  }
  const fetchData = async () => {
    const { data } = await axios.get(
      `${API_URL}${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `${API_URL}${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  const fetchProviders=async () =>{
    const { data } = await axios.get(
      `${API_URL}${media_type}/${id}/watch/providers?api_key=${API_KEY}`
    );
    setProviders(data.results.US)
  
    

  }
  const convertMinsToTime = (mins) => {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  if(hours>1){
    return `${hours} hrs ${minutes} mins`
  }
  return`${hours} hr ${minutes} mins` ;
}
const seasonNum=(show)=>{
  if(show.number_of_seasons>1){
    return `${show.number_of_seasons} seasons`
  }
  return `${show.number_of_seasons} season`
}
  useEffect(() => {   
    fetchData();
    fetchVideo();
    fetchProviders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                    

                  )}
          
                  <p className="runTime">
                    {content.title ? convertMinsToTime(content.runtime) : seasonNum(content)}
                    </p>
                  {/* {convertMinsToTime(content.runtime)}</p> */}
                  <p>Rating: {content.vote_average}</p>
                    <ReactStars
                    count={content.vote_average}
                      value={content.vote_average}
                      edit={false}
                      size={20}
                      color1={"#f4c10f"}
                      isHalf={true}
                    ></ReactStars>
                 <span><StarOutlined
                 onClick={()=>AddToWatchlist(content)}
                 style={{fill:'black'}}/> 
                 Add to Watchlist
                 </span>
 
    
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                 
                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    onClick={handleTrailerOpen}
                    
                  >
                    Watch the Trailer
                  </Button>
                <Modal
                className={classes.modal}
                open={traileropen}
                onClose={handleTrailerClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                  <VideoModal video={video}/>
                  </Modal>
                 {providers &&(
                    <Button
                    variant="contained"
                    startIcon={<More/>}
                    color="secondary"
                    target="__blank"
                    href={providers.link}
                  >
                    More Info
                  </Button>
                 )}
                </div>
              </div>
            
            </div>
            
          )}
          
        </Fade>
      </Modal>
    </>
  );
}

