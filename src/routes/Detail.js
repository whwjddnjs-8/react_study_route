import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();

        setMovie(json.data.movie);
    }

    useEffect(() => {
        getMovie();
    }, [])


    return (
        <div className={styles.detailBody}>
            <h1>{movie.title_long}</h1>
            <p className={styles.icon_area}>
                <span><i className="fa-solid fa-star"></i>{movie.rating}</span> 
                <span><i className="xi-file-download-o"></i>{movie.download_count}</span>
                <span><i className="fa-solid fa-heart"></i>{movie.like_count}</span>
            </p>
            
            <img src={movie.large_cover_image} />
             {
                movie && movie.genres ? 
                <ul>
                    {movie.genres.map((x) => 
                        <li key={x}>{x}</li>
                    )}
                </ul> : null
            }
            <p className={styles.description}>{movie.description_full}</p>
            
            <div className={styles.btn_area}>
                <a href={movie.url} className={styles.show_url}  target="_blank">
                    Show Movie
                </a>
            </div>
            
        </div>
    )
}

export default Detail;