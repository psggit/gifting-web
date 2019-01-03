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
      questionAnswers: [],
      // username: props.username ? props.username : "",
      // isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    this.showAnswer = this.showAnswer.bind(this)
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    this.setState({questionAnswers})
  }

  // componentWillReceiveProps(newProps) {
  //   //console.log("helo", newProps)
  //   if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
  //     this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
  //   }
  // }

  showAnswer(quesNo) {
    //console.log("quesNo", quesNo)
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
    //console.log("item", item)
    return (
      <div className="section">
        <div className={`question ${item.ques_number}`} style={{display: 'flex'}}>
          <div style={{position: 'relative'}} className="os s7">Q.) {item.question}</div>
          <span className={`show ${item.ques_number}`} style={{cursor: 'pointer'}} onClick={() => this.showAnswer(item.ques_number)}>
            <Icon name="plus" />
          </span>
          <span className={`hide ${item.ques_number}`} style={{cursor: 'pointer'}} onClick={() => this.hideAnswer(item.ques_number)}>
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
        <Header history={this.props.history} />
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