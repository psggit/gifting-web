import React from "react"
import Header from "Components/header"
import Footer from "Components/footer"
import './faq.scss'
import Icon from "Components/icon"
import {questionAnswers} from './QA'

class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionAnswers: []
    }
    this.showAnswer = this.showAnswer.bind(this)
  }

  componentDidMount() {
    this.setState({questionAnswers})
  }

  showAnswer(quesNo) {
    console.log("quesNo", quesNo)
    document.getElementsByClassName(`answer ${quesNo}`)[0].style.display = 'block'
    document.getElementsByClassName(`hide ${quesNo}`)[0].style.display = 'block'
    document.getElementsByClassName(`show ${quesNo}`)[0].style.display = 'none'
  }

  hideAnswer(quesNo) {
    document.getElementsByClassName(`answer ${quesNo}`)[0].style.display = 'none'
    document.getElementsByClassName(`show ${quesNo}`)[0].style.display = 'block'
    document.getElementsByClassName(`hide ${quesNo}`)[0].style.display = 'none'
  }

  renderQA(item) {
    console.log("item", item)
    return (
      <div className="section">
        <div className={`question ${item.ques_number}`} style={{display: 'flex'}}>
          <div style={{position: 'relative'}} className="os s7">Q.) {item.question}</div>
          <span className={`show ${item.ques_number}`} onClick={() => this.showAnswer(item.ques_number)}>
            <Icon name="plus" />
          </span>
          <span className={`hide ${item.ques_number}`} onClick={() => this.hideAnswer(item.ques_number)}>
            <Icon name="minus" />
          </span>
        </div>
        <div className={`answer one os s6 ${item.ques_number}`}>
          A.) {item.answer}
        </div>
      </div>
    )
  }

  render() {
    const {questionAnswers} = this.state
    return (
      <div>
        <Header />
        <div id="Faq">
          <div className="content">
            <h2 className="cm s1">Frequently Asked Questions</h2>
            <div className="faqContainer">
              {
                questionAnswers.length > 0 &&
                questionAnswers.map((item) => (
                  this.renderQA(item)
                ))
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default FAQ