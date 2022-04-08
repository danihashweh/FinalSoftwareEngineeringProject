import { Pie } from "react-chartjs-2";
import {custom} from "babel-loader";

const React = require('react');
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
        let text = []
        console.log("hi, entering 1st for loop")
        for (let question of questions) {
            console.log(question.type)
            switch (question.type) {
                case "TEXT":
                    for (let answer of question.answerList) {
                        text.push(<p>{answer.answer}</p>)
                    }
                case "MULTIPLE_CHOICE":
                    console.log("hi, entering case")
                    for (let answer of question.answerList) {
                        multipleChoiceAnswers.push(<p>{answer.answer}</p>)
                    }
                    console.log("hi, finished forloop")
                    let data = multipleChoiceAnswers
                    let labels = ["Dani", "Abdalla", "AJ"]
                    let customLabels = labels.map((label,index) =>`${label}: ${data[index]}`)

                    const chartData = {
                        labels: customLabels,
                        datasets: [
                            {
                                label: "Test",
                                backgroundColor: [
                                    "#83ce83",
                                    "#959595",
                                    "#f96a5d",
                                    "#00A6B4",
                                    "#6800B4",
                                ],
                                data: data,
                            },
                        ],
                    };
                    console.log("hi, finished")
            }
        }
        return (
            <div>
                {text}
                <Pie
                    data={chartData}
                    options={{
                        legend: { display: true, position: "right" },

                        datalabels: {
                            display: true,
                            color: "white",
                        },
                        tooltips: {
                            backgroundColor: "#5a6e7f",
                        },
                    }}
                />
            </div>
        )
    };


}
export default Results;