import React from "react";
import Button from "@material-ui/core/Button";
const client = require('./client'); // <3>


class Home extends React.Component {

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
    window.location.assign(`/survey?formId=${formId}`);
  }

  render() {
    const { formIds } = this.state
    let buttons = []


    for (let formId of formIds) {
      buttons.push(<Button>{formId}</Button>)
    }
    return(
      <div>
        {buttons}
      </div>
    )
  }
}
export default Home;