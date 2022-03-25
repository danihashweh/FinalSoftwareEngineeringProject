import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import {Grid} from "@material-ui/core";

const React = require('react'); // <1>

export default class Question extends React.Component{

  constructor(props) {
    super(props);
  }

  renderTextQuestion() {
    const { value, id, handleInputChange, answer } = this.props
    return (
      <>
        <Grid item>
          <FormLabel>{value}</FormLabel>
          <TextField
            id={id}
            name={id}
            type="string"
            value={answer}
            onChange={handleInputChange}
          />
        </Grid>
      </>
    )
  }

  render() {
    const { type } = this.props

    switch(type) {
      case "TEXT":
        return this.renderTextQuestion()
      default:
        return (
            <div>{this.props.value}</div>
        )
    }
  }
}