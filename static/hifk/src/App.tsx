import React from 'react';
import Logo from './hifk.png';
import './App.css';
import Button from '@material-ui/core/Button'

const url = 'https://apistaging.goalstracker.info/subscription';


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { userSubscribed: false };
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        this.detectUser()
    }

    register() {
        if (!('serviceWorker' in navigator)) {
            alert('Your browser does not support service workers.');
            return;
        }

        navigator.serviceWorker.register('sw.js')

        navigator.serviceWorker.ready
        .then(registration => {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: this.getApplicationServerKey()
            };

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then((pushSubscription: any) => {
            var data = JSON.stringify(pushSubscription);
            console.log('Received PushSubscription: ', data);
            return this.sendToServer(data);
        })
        .then(() => {
            this.detectUser();
        })
        .catch(error => {
            alert('Error during your registration');
            console.error('Error during service worker registration:', error);
        });
    }

    getApplicationServerKey():Uint8Array {
        const base64String = 'BGeQdm67i8LCUJ3ATI_lLM3HY78BliDlg63jPpqq3OnPDuRCqu7AeyDNR_GxAvAm6FC2SehtO5dW9jWFWQ2d4Q4'
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const applicationServerKey = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            applicationServerKey[i] = rawData.charCodeAt(i);
        }

        return applicationServerKey;
    }

    detectUser() {
        if (Notification && Notification.permission === 'granted') this.setState({ userSubscribed: true });

        else this.setState({ userSubscribed: false })
    }

    sendToServer(subscription: any) {
        return new Promise((resolve, reject) => {
            const parameters = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: subscription
            };

            fetch(url, parameters)
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    reject('Something wrong happened. Please contact support.');
                }
            })
            .catch((error) => {
                reject('There has been a problem with your fetch operation: ' + error.message);
            });
        });
    }

    unregister() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="Buttons">
                        <Buttons onClick={this.register} userSubscribed={this.state.userSubscribed}/>
                    </div>
                </header>
            </div>
        );
    }
}

class Buttons extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render () {
        const userSubscribed = this.props.userSubscribed;
        const clickableButton = <p><Button onClick={this.handleClick} variant="contained" color="primary">Click here and watch HIFK!</Button></p>;
        const messageButton = <p><Button variant="contained" color="primary">Registration completed!</Button></p>;
        const image = <p><img src={Logo} className="App-logo" alt="logo"/></p>;

        if (userSubscribed) {
            return (
                <div className="Buttons">
                    {image}
                    {messageButton}
                </div>
            );
        } else {
            return (
                <div className="Buttons">
                    {clickableButton}
                </div>
            );
        }
    }
}

export default App;
