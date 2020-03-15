import React from 'react';
import './App.css';
import Buttons from './Buttons';
import SubscriptionStatus from './SubscriptionStatus';

const url = 'https://apidev.goalstracker.info/subscription';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { subscriptionStatus: SubscriptionStatus.NotSubscribed };
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        this.detectUser();
    }

    register() {
        this.setState({ subscriptionStatus: SubscriptionStatus.InProgress });
        
        if (!('serviceWorker' in navigator)) {
            alert('Your browser does not support service workers.');
            this.setState({ subscriptionStatus: SubscriptionStatus.NotSubscribed })
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
        .catch(error => {
            alert('Error during your registration');
        })
        .then(() => {
            this.detectUser();
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
        if (Notification && Notification.permission === 'granted') this.setState({ subscriptionStatus: SubscriptionStatus.Subscribed });

        else this.setState({ subscriptionStatus: SubscriptionStatus.NotSubscribed })
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
                        <Buttons onClick={this.register} subscriptionStatus={this.state.subscriptionStatus}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
