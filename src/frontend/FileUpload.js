import React from 'react';
import PrintInvoice from './PrintInvoice'

class FileUpload extends React.Component {
  constructor(props) {
	super(props);
	

    this.state = {
	  invoiceJson: '',
	  invoicesParsed: false,
	  configuration: {
		  city: "",
		  original: "",
	  }
	};
	
	
	this.parsedOrders = {};

	this.handleUploadImage = this.handleUploadImage.bind(this);
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
			{
				this.state.invoicesParsed ? (
					<div>
						<h2>Invoices </h2>
						<div>
							{
								this.state.invoiceJson != "" ? JSON.parse(this.state.invoiceJson).map((element) => <PrintInvoice invoice={JSON.stringify(element)}>{element["guid"]}</PrintInvoice>): <div></div>
							}
						</div>
					</div>
				) : (<div></div>)
			}
		</div>
    );
  }
}

export default FileUpload;