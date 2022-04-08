import {Chart} from "chart.js";

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

        for (let question of questions) {
            switch (question.type) {
                case "TEXT":
                    for (let answer of question.answerList) {
                        text.push(<p>{answer.answer}</p>)
                    }
            }

        }
        return (
            <div>
                {text}
            </div>
        )
    }
}
export default Results;