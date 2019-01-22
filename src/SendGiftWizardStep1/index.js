import React from "react"
import "./send-gift-wizard-step1.scss"
import Button from "Components/button"
import Icon from "Components/icon"

class SendGiftWizardStep1 extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return(
            <div>
                <div id="send-gift-wizard-step1">
                    <div className="container os">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-2">
                                    <div className="gift">
                                        <Icon name= "gift"/>
                                    </div>
                                    <div className="welcome-to-hipbar os s1">
                                        Welcome to HipBar Gifting!
                                    </div>
                                    <div className="we-ll-help-you-choos os s5">
                                        We’ll help you choose the perfect drink to gift for your special someone!
                                    </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <Icon name= "mobileApplnUser"/>
                            </div>
                            <div className="col-2">
                                <div className="steps os s4">
                                    Start off by entering the name of your loved one
                                </div>
                                <div className="steps-result os s6">
                                    This will help us provide a much more personalised experience to you.
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="receiverName" 
                                        type="text" 
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <Icon name= "mobileApplnUser"/>
                            </div>
                            <div className="col-2">
                                <div className="steps os s4">
                                Which city does the Karthik Pasagada reside in?
                                </div>
                                <div className="steps-result os s6">
                                This will let us show you the list of drinks available in that city.
                                </div>
                                <div className="">
                                City selected
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                            </div>
                            <div className="col-2  next os s4">
                                <Button
                                primary 
                                icon="rightArrowWhite"
                                className="os s4"
                                >
                                NEXT
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}  

export default SendGiftWizardStep1