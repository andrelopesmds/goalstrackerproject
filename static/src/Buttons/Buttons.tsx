import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CSS from 'csstype';
import Loading from './Loading';
import SubscriptionStatus from '../SubscriptionStatus';
import DialogSlide from './DialogSlide';
import { AvailableTeam } from '../Utils/globalInterfaces';

interface ButtonsProps {
    onClick: Function,
    subscriptionStatus: SubscriptionStatus,
    availableTeams: AvailableTeam[]
}

interface ButtonsStates { }

class Buttons extends React.Component<ButtonsProps, ButtonsStates> {
    constructor(props: ButtonsProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(teamsIds: Number[]) {
        if (teamsIds.length > 0) {
            this.props.onClick(teamsIds);
        }
    }

    render () {
        const clickableButtonText = 'Click here and track your team!';
        const messageButtonText = 'Registration completed!';
        const buttonProperties: ButtonProps = {
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
        const clickableButton = <DialogSlide buttonProperties={buttonProperties} availableTeams={this.props.availableTeams} text={clickableButtonText} onClick={this.handleClick}/>;
        const messageButton = <p><Button {...buttonProperties} style={messageButtonStyles}>{messageButtonText}</Button></p>;

        return (
            <div className="Buttons">
              { subscriptionStatus === SubscriptionStatus.NotSubscribed && clickableButton }
              { subscriptionStatus === SubscriptionStatus.InProgress && <Loading/> }
              { subscriptionStatus === SubscriptionStatus.Subscribed && messageButton }
            </div>
        );
    }
}

export default Buttons;