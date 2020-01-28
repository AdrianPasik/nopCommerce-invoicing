import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
  class App extends React.Component {
	render() {
	  return (
		<div>
			<form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3001/fileupload">
				<label for="fileupload"> Wybierz plik który chcesz wczytać</label>
				<input type="file"></input>
				<input type="submit" value="Wczytaj plik" id="submit" />
			</form>
		</div>
		
	  );
	}
  }
  
  
  ReactDOM.render(
	<App />,
	document.getElementById('root')
  );
  