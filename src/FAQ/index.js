import React from "react"
import Header from "Components/header"
import Footer from "Components/footer"
import './faq.scss'
import Icon from "Components/icon"
import {sendingGiftCardQuestions, redeemingGiftCardQuestions} from './QA'
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"
import AgeGate from './../AgeGate'
import {readCookie} from "Utils/session-utils"
import { mountModal } from 'Components/modal-box/utils'

class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingGiftCardQuestions: [],
      //isModelOpen: false,
      activeAccordian: -1
      // username: props.username ? props.username : "",
      // isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    //this.toggleBox = this.toggleBox.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.toggleAccordian = this.toggleAccordian.bind(this)
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    this.setState({sendingGiftCardQuestions})
    if(!readCookie("isAgeGateAgreed")) {
      mountModal(AgeGate({}))
    }
  }

  setActiveAccordian(activeAccordian) {
    this.setState({activeAccordian})
  }

  toggleAccordian() {
    this.setState({activeAccordian: -1})
  }

  render() {
    const {sendingGiftCardQuestions} = this.state
    return (
      <div>
        <div id="Faq">
          <div className="content">
            <h2 className="cm s1">Frequently Asked Questions</h2>
            <div className="faqContainer">
              <div className="header">
                <div className="os s7" style={{fontWeight: '600'}}> SENDING A GIFT CARD </div>
              </div>
              <div style={{marginBottom: '70px'}}>
                {
                  sendingGiftCardQuestions.length > 0 &&
                  <Accordian
                    //middleware={this.setCardValues}
                    setActiveAccordian={this.setActiveAccordian}
                    toggleAccordian={this.toggleAccordian}
                    activeAccordian={this.state.activeAccordian}
                  >
                    {
                      sendingGiftCardQuestions.map((item, index) => (
                        <AccordianItem key={index} title={item.question} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index ? <Icon name="minus" /> : <Icon name="plus" />} id={index}>
                          <p className="os s7">
                            {item.answer}
                          </p>
                        </AccordianItem>
                      ))
                    }
                  </Accordian>
                }
              </div>
              <div className="header">
                <div className="os s7" style={{fontWeight: '600'}}> REDEEMING A GIFT CARD </div>
              </div>
              {
                redeemingGiftCardQuestions.length > 0 && 
                <Accordian
                  //middleware={this.setCardValues}
                  setActiveAccordian={this.setActiveAccordian}
                  toggleAccordian={this.toggleAccordian}
                  activeAccordian={this.state.activeAccordian}
                >
                  {
                    redeemingGiftCardQuestions.map((item, index) => (
                      <AccordianItem key={index+11} title={item.question} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index+11 ? <Icon name="minus" /> : <Icon name="plus" />} id={index+11}>
                        <p className="os s7">
                          {item.answer}
                        </p>
                      </AccordianItem>
                    ))
                  }
                </Accordian>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FAQ