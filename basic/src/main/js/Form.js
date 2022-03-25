const React = require('react'); // <1>
import Question from './Question'


export default class Form extends React.Component{
  render() {
    const questionsArr = this.props?.questions ?? []
    const questions = questionsArr.map(question =>
      <Question key={question.id} value={question.value} type={'text'}/>
    );
    return (
      <div>
        {questions}
      </div>
    )
  }
}