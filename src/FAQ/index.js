import React from "react"
import Footer from "Components/footer"
import './faq.scss'
import Icon from "Components/icon"
// import { redeemingGiftCardQuestions } from './QA'
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"

class FAQ extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingGiftCardQuestions: [],
      redeemingGiftCardQuestions: [],
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
    //this.setState({ sendingGiftCardQuestions })
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer Y3NzSUUzTmlLbFh4Z2JsYUV2bmk =');
    fetch(`https://hipbar.freshdesk.com/api/v2/solutions/folders/9000087684/articles`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("response data", data)
        this.setState({
          sendingGiftCardQuestions: data
        })
      })
      .catch((err) => {
        console.log("Error in fetching faq's", err)
      })

    fetch(`https://hipbar.freshdesk.com/api/v2/solutions/folders/9000087685/articles`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("response data", data)
        this.setState({
          redeemingGiftCardQuestions: data
        })
      })
      .catch((err) => {
        console.log("Error in fetching faq's", err)
      })
  }

  setActiveAccordian(activeAccordian) {
    // if(window.gtag) {
    //   gtag("event", "count_FAQ_wise", {
    //     "event_label": this.state.sendingGiftCardQuestions[activeAccordian+1].question
    //   })
    // }
    this.setState({ activeAccordian })
  }

  toggleAccordian() {
    this.setState({ activeAccordian: -1 })
  }

  render() {
    const { sendingGiftCardQuestions, redeemingGiftCardQuestions } = this.state
    return (
      <div>
        <div id="Faq">
          <div className="content">
            <h2 className="cm s1">Frequently Asked Questions</h2>
            <div className="faqContainer">
              <div className="header">
                <p className="os s7" style={{ fontWeight: '600' }}> SENDING A GIFT CARD </p>
              </div>
              <div style={{ marginBottom: '70px' }}>
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
                        <AccordianItem key={index} title={item.title} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index ? <Icon name="minus" /> : <Icon name="plus" />} id={index}>
                          <p className="os s7">
                            {item.description_text}
                          </p>
                        </AccordianItem>
                      ))
                    }
                  </Accordian>
                }
              </div>
              <div className="header">
                <p className="os s7" style={{ fontWeight: '600' }}> REDEEMING A GIFT CARD </p>
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
                      <AccordianItem key={index + 11} title={item.title} icon={this.state.activeAccordian !== -1 && this.state.activeAccordian === index + 11 ? <Icon name="minus" /> : <Icon name="plus" />} id={index + 11}>
                        <p className="os s7">
                          {item.description_text}
                        </p>
                      </AccordianItem>
                    ))
                  }
                </Accordian>
              }
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

export default FAQ