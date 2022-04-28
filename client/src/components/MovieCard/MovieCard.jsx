import { img_300, unavailable } from "../../config/config";
import "./MovieCard.css";
import ContentModal from "../ContentModal/ContentModal";

const MovieCard = ({
  id,
  poster,
  title,
  date,
  media_type,
  
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default MovieCard;
