import React from 'react'

class PrintInvoice extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  invoiceJson: '',
		};

		this.preventDefault = this.preventDefault.bind(this);
	}

	printInvoice(ev) {
		ev.preventDefault();

	}

	render() {
		<div>
			<span>Order Id {this.props.orderId}</span>
			<button onClick={this.printInvoice}>Print invoice</button>
		</div>
	}
}