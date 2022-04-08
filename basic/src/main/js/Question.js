import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Likert from 'react-likert-scale';
import {Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const React = require('react'); // <1>

class Question extends React.Component {

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

    renderMCQuestion() {
        const {value, id, handleInputChange, answer, questionOptions} = this.props

        const fCLs = questionOptions.map((qO) =>
            (<FormControlLabel
                key={qO}
                value={qO}
                control={<Radio size="small"/>}
                label={qO}
            />)
        )

        return (
            <>
                <Grid item>
                    <FormControl>
                        <FormLabel>{value}</FormLabel>
                        <RadioGroup
                            name={id}
                            value={answer}
                            onChange={handleInputChange}
                            row
                        >
                            {fCLs}
                        </RadioGroup>
                    </FormControl>
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
            responses: questions
        };
        return (
            <Grid item>
                <FormLabel>{value}</FormLabel>
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
            case "TEXT":
                return this.renderTextQuestion()
            case "MULTIPLE_CHOICE":
                return this.renderMCQuestion()
            case "NUMBER_RANGE":
                return this.renderRangeQuestion()
            default:
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
    }
}

export default Question;