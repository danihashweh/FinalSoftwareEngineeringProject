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
        const {value, id, handleInputChange, answer, min, max} = this.props
        const questions = [];
            for (let i = min; i < max; i++) {
                questions.push({value: i, text: i.toString()})
            }
            const likertOptions = {
                question: value,
                responses: questions,
                handleInputChange: val => {
                    console.log(val);
                }
            };
            return (
                <Likert {...likertOptions} />
            )

        // const likertOptions = {
        //     question: "What is your opinion of the President’s performance?",
        //     responses: [
        //         {value: 1, text: "Abysmal"},
        //         {value: 2, text: "Poor"},
        //         {value: 3, text: "Average", checked: true},
        //         {value: 4, text: "Good"},
        //         {value: 5, text: "Excellent"}
        //     ],
        //     handleInputChange: val => {
        //         console.log(val);
        //     }
        // };
        // return (
        //     <Likert {...likertOptions} />
        // )
    }

    render() {
        const {type} = this.props

        switch (type) {
            case "text":
                return this.renderRangeQuestion()
            default:
                return (
                    <div>{this.props.value}</div>
                )
        }
    }
}