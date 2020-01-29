import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceJson: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:3001/invoiceupload', {
	  method: 'POST',
      body: data,
    }).then((response) => {
		response.text().then((text) => {
			console.log(text);
			this.setState({invoiceJson: text});
		});
		
		
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <span>Uploaded {this.state.invoiceJson}</span>
      </form>
    );
  }
}

export default FileUpload;