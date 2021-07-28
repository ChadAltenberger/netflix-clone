import './App.css';
import requests from './requests';
import Banner from './components/Banner';
import Row from './components/Row';
import Nav from './components/Nav';

function App() {
	return (
		<div className='app'>
			<Nav />
			<Banner />
			<Row
				title='Netflix Originals'
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row title='Top Rated' fetchUrl={requests.fetchTrending} />
			<Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
			<Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
			<Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
			<Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
			<Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default App;
