import React from 'react';
import logo from './hifk.png';
import './App.css';
import Button from '@material-ui/core/Button'

const url = 'https://4egurxs7ph.execute-api.eu-north-1.amazonaws.com/dev/subscription';


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { subscriptionDone: false };
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
            const base64String = 'BGeQdm67i8LCUJ3ATI_lLM3HY78BliDlg63jPpqq3OnPDuRCqu7AeyDNR_GxAvAm6FC2SehtO5dW9jWFWQ2d4Q4'
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const applicationServerKey = new Uint8Array(rawData.length);
    
            for (let i = 0; i < rawData.length; ++i) {
                applicationServerKey[i] = rawData.charCodeAt(i);
            }

            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            };

            return registration.pushManager.subscribe(subscribeOptions)
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

    detectUser() {
        if (Notification && Notification.permission === 'granted') this.setState({ subscriptionDone: true });

        else this.setState({ subscriptionDone: false })
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
                        { this.state.subscriptionDone ? null : <p><Button onClick={this.register.bind(this)} variant="contained" color="primary">Click here and watch HIFK!</Button></p> }
                        { this.state.subscriptionDone ? <p><img src={logo} className="App-logo" alt="logo"/></p> : null }
                        { this.state.subscriptionDone ? <p><Button variant="contained" color="primary">Registration completed!</Button></p> : null }
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
