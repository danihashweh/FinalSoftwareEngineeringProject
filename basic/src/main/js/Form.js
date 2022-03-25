import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const React = require('react'); // <1>
import Question from './Question'


export default class Form extends React.Component{

  constructor(props) {
    super(props);
    this.state = {formValues: {}}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const { questions } = this.props

    if (prevProps.questions.length !== questions.length ) {
      let formValues = {}
      for(let question of questions) {
        formValues[question.id] = ""
      }
      this.setState({formValues})
    }

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formValues } = this.state
    this.setState({ formValues: {...formValues, [name]: value}});
  };


  render() {

    const {formValues} = this.state

    const questionsArr = this.props?.questions ?? []
    const questions = questionsArr.map(question =>
        <Question key={question.id} type={'text'} answer={formValues[question.id]} handleInputChange={this.handleInputChange}{...question}/>
    );
    const handleSubmit = (event) => {
                event.preventDefault();
                console.log(formValues);
              };
    return (
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
        {questions}
        </Grid>
        <Grid container justify="center">
        <Button variant="contained" color="primary" type="submit">
        Submit
        </Button>
        </Grid>
      </form>
    )
  }
}