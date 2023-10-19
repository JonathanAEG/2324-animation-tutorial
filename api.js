import { API_KEY,GENRES } from "./config";

const API_URL = `https://api.themoviedb.org/3/list/8274618?api_key=${API_KEY}`

export default getMovies = async()=>{

    try{
        let response = await fetch(API_URL);
        let json = await response.json();
        if(json.items){

            const movies = json.items.map(
                ({
                    id,
                    original_title,
                    poster_path,
                    backdrop_path,
                    vote_average,
                    overview,
                    release_date,
                    // genre_ids,
                })=>({
                    key: String(id),
                    originalTitle: original_title,
                    posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
                    backdropPath: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
                    voteAverage: vote_average,
                    description: overview,
                    releaseDate: release_date,
                    // genres: genre_ids[0].name
                })
            )
            return movies;
        }
        
    }catch(e){
        console.error(e);
    }
}
