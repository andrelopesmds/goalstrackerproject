import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CSS from 'csstype';
import SubscriptionStatus from '../Enums/SubscriptionStatus';
import DialogSlide from '../Utils/DialogSlide';
import { AvailableTeam } from '../Utils/globalInterfaces';

interface HomeProps {
    onClick: Function,
    subscriptionStatus: SubscriptionStatus,
    availableTeams: AvailableTeam[]
}

interface HomeStates { }

class Home extends React.Component<HomeProps, HomeStates> {
    constructor(props: HomeProps) {
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

        const subscriptionStatus = this.props.subscriptionStatus;
        const clickableButton = <DialogSlide buttonProperties={buttonProperties} availableTeams={this.props.availableTeams} text={clickableButtonText} onClick={this.handleClick}/>;
        const messageButton = <p><Button {...buttonProperties} style={messageButtonStyles}>{messageButtonText}</Button></p>;

        return (
            <div className="Buttons">
              { subscriptionStatus === SubscriptionStatus.NotSubscribed && clickableButton }
              { subscriptionStatus === SubscriptionStatus.InProgress && <CircularProgress/> }
              { subscriptionStatus === SubscriptionStatus.Subscribed && messageButton }
            </div>
        );
    }
}

export default Home;