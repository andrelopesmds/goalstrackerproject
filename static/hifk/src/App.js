import React from 'react';
import logo from './hifk.png';
import './App.css';
import Button from '@material-ui/core/Button'

const url = 'https://vgdmfvp2pk.execute-api.us-east-1.amazonaws.com/dev';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subscriptionDone: false };
    }

    componentDidMount() {
        this.detectUser()
    }

    register() {
        if ('serviceWorker' in navigator) {
            const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
            
            if (publicUrl.origin !== window.location.origin) {
                console.log(`The public url(${publicUrl.origin}) is on a different origin from what(${window.location.origin}) the page is served on`);
                return;
            }
    
            const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
            this.registerValidSW(swUrl);
        } else {
            // todo alert here
            console.log('Your browser does not support service workers.');
        }
    }

    registerValidSW(swUrl) {
        navigator.serviceWorker
            .register(swUrl)
            .then(registration => {
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker == null) {
                        return;
                    }
    
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'activated') {
                            this.subscribe(registration);
                        }
                    };
                };
            })
            .catch(error => {
                console.error('Error during service worker registration:', error);
            });
    }

    detectUser() {
        if (Notification && Notification.permission === 'granted') this.setState({ subscriptionDone: true });

        else this.setState({ subscriptionDone: false })
    }
    
    subscribe(registration) {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array('BB_UaOpdFIEjEWMyhhd4QQcFDwlaftDy605YjzatvFlCoYMvjpFUFHNy_KoGpRcoOBxUzDN2_8svehppzOolYP4')
        };
    
        return registration.pushManager.subscribe(subscribeOptions)
            .then(pushSubscription => {
                var data = JSON.stringify(pushSubscription);
                console.log('Received PushSubscription: ', data);
                return this.sendToServer(data);
            })
            .then(() => {
                this.detectUser();
            })
            .catch(err => console.log(err));
    }
    
    sendToServer(subscription) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: subscription
            })
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    reject('Something wrong happened. Please contact support.');
                }
            })
            .catch(function(error) {
                reject('There has been a problem with your fetch operation: ' + error.message);
            });
        });
    }
    
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
    
        return outputArray;
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
                        { this.state.subscriptionDone ? <p><Button onClick={this.unregister} variant="contained" color="primary">Unsubscribe</Button></p> : null }
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
