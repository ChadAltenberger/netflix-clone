import { useState, useEffect } from 'react';
import axios from '../axios';
import { baseImgUrl } from '../baseImgUrl';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	// Snippet of code that runs based on specific condition/variable
	useEffect(() => {
		// If [], run once when Row loads, and don't run again
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1
		}
	};

	const handleClick = movie => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.name || movie?.title || '')
				.then(url => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch(error => console.log(error));
		}
	};

	return (
		<div className='row'>
			<h2>{title}</h2>
			<div className='row__posters'>
				{movies.map(movie => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${baseImgUrl}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
