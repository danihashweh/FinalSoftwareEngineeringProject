import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Likert from 'react-likert-scale';
import {Grid} from "@material-ui/core";

const React = require('react'); // <1>

export default class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTextQuestion() {
        const {value, id, handleInputChange, answer} = this.props
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

    renderRangeQuestion() {
        const {value, id, handleInputChange, answer, minValue, maxValue} = this.props
        const questions = [];
            for (let i = minValue; i <= maxValue; i++) {
                questions.push({value: i, text: i.toString()})
            }
            const likertOptions = {
                question: value,
                responses: questions
            };
            return (
                <Grid item>
                <Likert
                    {...likertOptions}
                    id={id}
                    name={id}
                    value={answer}
                    onChange={handleInputChange}
                />
                </Grid>
            )
    }

    render() {
        const {type} = this.props

        switch (type) {
            case "NUMBER_RANGE":
                return this.renderRangeQuestion()
            default:
                return (
                    <div>{this.props.value}</div>
                )
        }
    }
}