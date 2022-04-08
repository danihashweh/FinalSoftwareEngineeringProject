import Grid from "@material-ui/core/Grid";

const React = require('react'); // <1>
import Question from './Question'
import Button from "@material-ui/core/Button";
const client = require('./client'); // <3>


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {formValues: {}, questions: [], formId: ""}
    }

    componentDidMount() { // <2>
      const formId = new URLSearchParams(this.props.location.search).get("formId")
      client({method: 'GET', path: `/getForm/${formId}`}).done(response => {
        let formValues = {}
        for (let question of response.entity.questions) {
          formValues[question.id] = ""
        }
        this.setState({questions: response.entity.questions, formValues, formId});
      });
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        const {formValues} = this.state
        this.setState({formValues: {...formValues, [name]: value}});
    };

    handleSliderChange = (id) => (value) => {
        const {formValues} = this.state
        this.setState({formValues: {...formValues, [id]: value.text}});
    };
  handleSubmit = (event) => {
    const { formValues } = this.state
    event.preventDefault();
    console.log(formValues);
    client({method: 'POST', path: '/submission', entity: Object.values(formValues),
      headers: {'Content-Type': 'application/json'}}).done(response => {
        console.log("finished")
        window.location.assign("/thanks");
        });
  };

    render() {

        const {formValues, questions} = this.state

        const questionsArr = questions.map(question => {
            let onChange = question.type === "NUMBER_RANGE" ? this.handleSliderChange(question.id) : this.handleInputChange
                return(<Question key={question.id} type={"NUMBER_RANGE"} answer={formValues[question.id]}
                          handleInputChange={onChange}{...question}/>)
            }
        );
        return (
          <form onSubmit={this.handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    {questionsArr}
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
            </form>
        )
    }
}

export default Form;