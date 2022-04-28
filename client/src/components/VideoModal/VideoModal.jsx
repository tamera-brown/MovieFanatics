import Modal from "@material-ui/core/Modal";
import ReactPlayer from 'react-player';

const VideoModal=({video})=>{
    
    return(
        
<ReactPlayer url={`https://www.youtube.com/watch?v=${video}`} playing
            width="100%" />
            
    )
};
export default VideoModal;