import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FileUpload from './frontend/FileUpload';
  
  class App extends React.Component {
	render() {
	  return (
		<div>
			<h2> Upload NopCommerce CSV file</h2>
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
  