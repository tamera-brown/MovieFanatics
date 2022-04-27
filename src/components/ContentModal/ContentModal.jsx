import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import More from "@material-ui/icons/More";
import StarOutlined from "@material-ui/icons/StarBorderOutlined"
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
  const [WatchList, setWatchList] = useState([]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addToWatchlist=(movie)=>{

    // const newFavouriteList = [...WatchList, movie];
		// setWatchList(newFavouriteList);
    console.log("clicked")

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
                  <p className="runTime">{convertMinsToTime(content.runtime)}</p>
                 <span><StarOutlined
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
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  
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
              {/* { headers.map(header=><h1>{header.provider_name}</h1>)} */}
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
