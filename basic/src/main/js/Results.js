// import {PieChart} from 'react-minimal-pie-chart';
// import { PieChart, Pie} from 'recharts';
import Histogram from 'react-chart-histogram';
import React, {Component} from "react";
import randomColor from "randomcolor";

const client = require("./client");

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {questions: [], formId: ""}
    }

    componentDidMount() {
        const formId = new URLSearchParams(this.props.location.search).get("formId")
        client({method: 'GET', path: `/getForm/${formId}`}).done(response => {
            this.setState({questions: response.entity.questions, formId});
        });
    }

    render() {
        const {questions} = this.state

        let multipleChoiceAnswers = []
        let multipleChoiceOptions = []
        let pieData = []
        let pieTitles = []
        let colour = []

        let numberRangeAnswers = []
        let numberRangeQuestionOptions = []
        let text = []
        let labels = []
        let histogramData = []
        let options = []


        for (let question of questions) {
            if (question.type === "TEXT") {
                for (let answer of question.answerList) {
                    text.push(<p>{answer.answer}</p>)
                }
            }
            if (question.type === "MULTIPLE_CHOICE") {
                for (let answer of question.answerList) {
                    multipleChoiceAnswers.push(parseInt(answer.answer));
                    multipleChoiceOptions = question.questionOptions;
                }
                for (let i = 0; i < multipleChoiceOptions.length; i++) {
                    colour.push(randomColor())
                }
                multipleChoiceOptions.forEach(x => pieTitles.push(x));
                pieData = {pieTitles, multipleChoiceAnswers, colour}
            }

            if (question.type === "NUMBER_RANGE") {
                for (let answer of question.answerList) {
                    numberRangeAnswers.push(answer.answer)
                }
                for (let i = question.minValue; i <= question.maxValue; i++) {
                    numberRangeQuestionOptions.push(i)
                }

                labels = numberRangeQuestionOptions;
                histogramData = numberRangeAnswers;
                options = {fillColor: '#FFFFFF', strokeColor: '#0000FF'};
            }
        }
        return (
            <div>
                {text}
                <Histogram
                    xLabels={labels}
                    yValues={histogramData}

                    width='400'
                    height='200'
                    options={options}
                />
            </div>
        )
    }
}

export default Results;