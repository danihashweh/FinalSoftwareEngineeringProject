import React from "react";
import Button from "@material-ui/core/Button";
const client = require('./client'); // <3>


class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {formIds: []}
  }

  componentDidMount() { // <2>
    client({method: 'GET', path: '/getAllForms'}).done(response => {
            this.setState({formIds: response.entity});
    });
  }

  submit = (formId) => () => {
    client({method: 'GET', path: `/closeForm/${formId}`,
      headers: {'Accept': 'text/plain'}}).done(response => {
      window.location.assign("/#/results");
    });
  }

  render() {
    const { formIds } = this.state
    let buttons = []


    for (let formId of formIds) {
      buttons.push(<Button key={formId} variant="contained" onClick={this.submit(formId)}>{formId}</Button>)
    }
    return(
      <div>
        <h2>Close Forms</h2>
        {buttons}
        <h2>Admin actions</h2>
      </div>
    )
  }
}
export default Admin;