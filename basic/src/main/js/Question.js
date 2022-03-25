import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

const React = require('react'); // <1>

export default class Question extends React.Component{

  constructor(props) {
    super(props);
  }

  renderTextQuestion() {
    const { value, id, handleInputChange, answer } = this.props
    return (
      <>
        <FormLabel>{value}</FormLabel>
        <TextField
          id={id}
          name={id}
          type="string"
          value={answer}
          onChange={handleInputChange}
        />
      </>
    )
  }

  render() {
    const { type } = this.props

    switch(type) {
      case "text":
        return this.renderTextQuestion()
      default:
        return (
            <div>{this.props.value}</div>
        )
    }
  }
}