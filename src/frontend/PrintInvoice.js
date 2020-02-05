import React from 'react'

class PrintInvoice extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  invoice: props.invoice,
		  invoiceResult: ""
		};

		this.printInvoice = this.printInvoice.bind(this);
	}

	printInvoice(ev) {
		ev.preventDefault();

		fetch('http://localhost:3001/faktura', {
			method: 'POST',
			body: "",
		}).then((response) => {
			response.text().then((text) => {
				var w = window.open('about:blank');
				w.document.open();
				w.document.write(text);
				w.document.close();
			});
			
			
		});
	}

	render() {
		return (
			<div>
				<span>Order Id {JSON.parse(this.state.invoice)["guid"]}</span>
				<a target="_blank" rel="external" onClick={this.printInvoice}>Print invoice</a>
				<span>{this.state.invoiceResult}</span>
			</div>
		)
	}
}

export default PrintInvoice;