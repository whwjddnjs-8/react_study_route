import PropTypes from "prop-types"; 
import { Link } from "react-router-dom"
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, summary, genres, rate }) {
    return (<div className={styles.movie}>
        <p className={styles.rating}><i className="fa-solid fa-star"></i>{rate}</p>
        <Link to={`/movie/${id}`}><img src={coverImg} alt={title} /></Link>
        <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
        <div className={styles.description}>
             <p>{summary ? summary : "No Description"}</p>
        </div>
        <ul>
            {genres.map((g) =>
                <li key={g}>{g}</li>)}
        </ul>
    </div>);
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string.isRequired)
}

export default Movie;