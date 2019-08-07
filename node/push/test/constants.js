let constants = {};

constants.validSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    expirationTime: null,
    key256: "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
    keyAuth: "GS_k7K70ihQtA1GvfAZ8wA=="
};

constants.invalidSubscription = {
    end: "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    expirationTime: null,
    key256: "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
    keyAuth: "GS_k7K70ihQtA1GvfAZ8wA=="
};

constants.validInput = {
    title: 'title',
    body: 'body',
    icon: 'icon'
};

module.exports = constants;
