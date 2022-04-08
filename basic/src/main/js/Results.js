import { Pie } from "react-chartjs-2";
import Histogram from 'react-chart-histogram';
import React, { Component } from "react";
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
        let numberRangeAnswers = []
        let numberRangeQuestionOptions = []
        let text = []
        let labels = []
        let data = []
        let options = []

        for (let question of questions) {
            switch (question.type) {
                case "TEXT":
                    for (let answer of question.answerList) {
                        text.push(<p>{answer.answer}</p>)
                    }
                case "MULTIPLE_CHOICE":
                    for (let answer of question.answerList) {
                        multipleChoiceAnswers.push(<p>{answer.answer}</p>)
                    }
                case "NUMBER_RANGE":
                    for (let answer of question.answerList) {
                        if(question.type === "NUMBER_RANGE")
                        numberRangeAnswers.push(answer.answer)
                    }
                    for (let i = question.minValue; i <= question.maxValue; i++) {
                        numberRangeQuestionOptions.push(i)
                    }

                    labels = numberRangeQuestionOptions;
                    data = numberRangeAnswers;
                    options = {fillColor: '#FFFFFF', strokeColor: '#0000FF'};
            }
        }
        return (
            <div>
                {text}
                <Histogram
                    xLabels={labels}
                    yValues={data}
                    width='400'
                    height='200'
                    options={options}
                />
            </div>
        )
    }
}
export default Results;