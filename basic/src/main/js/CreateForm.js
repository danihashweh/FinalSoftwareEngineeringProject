import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const client = require('./client'); // <3>


class CreateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {model: ""}
  }

  close = (formId) => () => {
    client({method: 'GET', path: `/closeForm/${formId}`,
      headers: {'Accept': 'text/plain'}}).done(response => {
      window.location.assign("/#/results");
    });
  }

  create = () => {
    const { model } = this.state
    client({method: 'POST', path: `/createForm`, entity: JSON.parse(model),
      headers: {'Content-Type': 'application/json', 'Accept': 'text/plain'}}).done(response => {
      window.location.assign("/#/admin");
    });
  }

  onChange = (event) => {
    this.setState({model: event.target.value})
  }

  render() {
    return(
      <div>
        <h2>Example</h2>
        {JSON.stringify([
          {
            "type": "text",
            "value": "What major are you in?"
          },
          {
            "type": "number_range",
            "value": "How nice of a day is it?",
            "minValue": 1,
            "maxValue": 5
          },
          {
            "type": "multiple_choice",
            "value": "Best month?",
            "answers": [
            "june",
            "april",
            "may"
            ]
          }
        ])}
        <h2>Enter Your Model</h2>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField label="Model" variant="outlined" onChange={this.onChange}/>
          <Button variant="contained" onClick={this.create}>Submit</Button>
        </div>
      </div>
    )
  }
}
export default CreateForm;