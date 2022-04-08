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

  close = (formId) => () => {
    client({method: 'GET', path: `/closeForm/${formId}`,
      headers: {'Accept': 'text/plain'}}).done(response => {
      window.location.assign("/#/results");
    });
  }

  create = () => {
    window.location.assign("/#/CreateNewForm");
  }

  render() {
    const { formIds } = this.state
    let buttons = []


    for (let formId of formIds) {
      buttons.push(<Button key={formId} variant="contained" onClick={this.close(formId)}>{formId}</Button>)
    }
    return(
      <div>
        <h2>Close Forms</h2>
        {buttons}
        <h2>Admin actions</h2>
        <Button variant="contained" onClick={this.create}>Create Form</Button>
      </div>
    )
  }
}
export default Admin;