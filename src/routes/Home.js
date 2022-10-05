import {useState, useEffect} from "react"
import Movie from "../components/Movie";
import styles from "./Home.module.css"

function Home() {
    const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year')).json();
    
    setMovies(json.data.movies);
    setLoading(false);
  }


  useEffect(() => {
      getMovies();
  }, []);

  return (
    <div>
          {loading ?
                <div className={styles.loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> :
              (<div>
                  <h1 className={styles.title}><span>Recommend Movies</span></h1>
                  <div className={styles.movies}>
                      {movies.map((movie) => 
                          <Movie
                            key={movie.id}
                            id={movie.id}
                            className={styles.movie}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                              genres={movie.genres}
                              rate={movie.rating}
                            />
                        )}
                    </div>
                    </div>)}
                </div>
  )
}

export default Home;