import React from 'react';
import Logo from './hifk.png';
import Button from '@material-ui/core/Button';
import CSS from 'csstype';
import Loading from './Loading';
import SubscriptionStatus from './SubscriptionStatus';

class Buttons extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render () {
        const clickableButtonText = 'Click here and watch HIFK!';
        const messageButtonText = 'Registration completed!';
        const buttonProperties: any = {
            variant: 'contained',
            color: 'primary'
        };
        const messageButtonStyles: CSS.Properties = {
            pointerEvents: 'none'
        };
        const imageStyles: CSS.Properties = {
            height: '20vmin',
        }

        const subscriptionStatus = this.props.subscriptionStatus;
        const clickableButton = <p><Button {...buttonProperties} onClick={this.handleClick}>{clickableButtonText}</Button></p>;
        const messageButton = <p><Button {...buttonProperties} style={messageButtonStyles}>{messageButtonText}</Button></p>;
        const image = <p><img src={Logo} style={imageStyles} alt="logo"/></p>;

        return (
            <div className="Buttons">
              { subscriptionStatus === SubscriptionStatus.NotSubscribed && clickableButton }
              { subscriptionStatus === SubscriptionStatus.InProgress && <Loading/> }
              { subscriptionStatus === SubscriptionStatus.Subscribed && image }
              { subscriptionStatus === SubscriptionStatus.Subscribed && messageButton }
            </div>
        );
    }
}

export default Buttons;