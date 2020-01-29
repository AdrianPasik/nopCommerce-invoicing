import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FileUpload from './FileUpload';
  
  class App extends React.Component {
	render() {
	  return (
		<div>
			<h2> Załaduj plik CSV z NopCommerce'a </h2>
			<FileUpload />
      	</div>
	  );
	}
  }
  
  
  ReactDOM.render(
	<App />,
	document.getElementById('root')
  );

  export default App;
  