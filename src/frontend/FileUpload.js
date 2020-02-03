import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	  invoiceJson: '',
	  invoicesParsed: false
	};
	
	this.parsedOrders = {};

	this.handleUploadImage = this.handleUploadImage.bind(this);
	this.handleClearMessage = this.handleClearMessage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
	data.append('file', this.uploadInput.files[0]);
	this.setState({invoiceJson: ""});

    fetch('http://localhost:3001/invoiceupload', {
	  method: 'POST',
      body: data,
    }).then((response) => {
		response.text().then((text) => {
			this.setState({invoicesParsed: true});
			this.setState({invoiceJson: text});
		});
		
		
    });
  }

  handleClearMessage(ev) {
	  ev.preventDefault();
	  this.setState({invoiceJson: ""});
  }

  render() {
    return (
		<div>
			<form onSubmit={this.handleUploadImage}>
				<div>
				<input ref={(ref) => { this.uploadInput = ref; }} type="file" />
				</div>
				<br />
				<div>
				<button>Upload</button>
				</div>
			</form>
			<button onClick={this.handleClearMessage}>Remove reponse message</button>
			{
				this.state.invoicesParsed ? (
					<div>
						<h2>Invoices </h2>
						<div>
							<span>{this.state.invoiceJson}</span>
							{
								JSON.parse(this.state.invoiceJson).map((element) => <button>{element["guid"]}</button>
							)}
						</div>
					</div>
				) : (<div></div>)
			}
			
			
			
		</div>
    );
  }
}

export default FileUpload;