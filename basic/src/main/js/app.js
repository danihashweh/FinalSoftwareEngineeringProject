import Form from './Form'
import RouterComponent from "./router/RouterComponent";

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
	}

	render() { // <3>
		return (
			<div>
				<RouterComponent />
			</div>
		)
	}
}
// end::app[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('root')
)
// end::render[]
