const newImage = {
  "score": {
      "S": "0 - 0"
  },
  "team1": {
      "S": "Real Madrid"
  },
  "team2": {
      "S": "Liverpool"
  },
  "team1Id": {
      "S": "105"
  },
  "timestamp": {
      "S": "2021-04-07T13:47:26.714Z"
  }
}

const event = {
  Records: [
    {
      eventName: 'INSERT',
      dynamodb: {
        NewImage: newImage
      }
    }
  ]
};

module.exports = event;