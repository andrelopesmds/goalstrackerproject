const SANTOS_PAST_GAMES = [  {
  "live": false,
  "played": true,
  "competition": "Brasileirão",
  "date": "Sep 2",
  "time": "8:30 AM",
  "game": "Santos 2 - 2 Vasco da Gama",
  "tvs": [
    "Globo",
    "Premiere FC Brasil"
  ]
},
{
  "live": false,
  "played": true,
  "competition": "Brasileirão",
  "date": "Sep 5",
  "time": "8:00 AM",
  "game": "Ceará 0 - 1 Santos",
  "tvs": [
    "Premiere FC Brasil",
    "TNT Brazil"
  ]
}, 
{
  "live": false,
  "played": true,
  "competition": "Brasileirão",
  "date": "Sep 9",
  "time": "8:30 AM",
  "game": "Santos 3 - 1 Atlético Mineiro",
  "tvs": [
    "Premiere FC Brasil"
  ]
},
{
  "live": false,
  "played": true,
  "competition": "Brasileirão",
  "date": "Sep 13",
  "time": "",
  "game": "Santos 2 - 2 São Paulo",
  "tvs": [
    "Premiere FC Brasil"
  ]
}];

const SANTOS_LIVE_GAME = {
  "live": true,
  "played": false,
  "competition": "Copa Libertadores",
  "date": "Sep 15",
  "time": "8:30 AM",
  "game": "Santos 0 - 0 Olimpia",
  "tvs": ["CONMEBOL TV", "fuboTV"]
};

const SANTOS_FUTURE_GAMES = [
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Sep 20",
    "time": "5:15 AM",
    "game": "Botafogo vs Santos",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Copa Libertadores",
    "date": "Sep 24",
    "time": "10:00 AM",
    "game": "Delfin vs Santos",
    "tvs": [
      "beIN SPORTS",
      "fuboTV",
      "Fanatiz USA"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Sep 27",
    "time": "7:30 AM",
    "game": "Santos vs Fortaleza",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Copa Libertadores",
    "date": "Oct 1",
    "time": "6:00 AM",
    "game": "Olimpia vs Santos",
    "tvs": [
      "fuboTV",
      "Fanatiz USA"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Oct 4",
    "time": "5:15 AM",
    "game": "Goiás vs Santos",
    "tvs": [
      "Premiere FC Brasil"
    ]
  }
];

const SANTOS_GAMES = SANTOS_PAST_GAMES.concat([SANTOS_LIVE_GAME]).concat(SANTOS_FUTURE_GAMES);

const ATLETICO_PAST_GAMES = [
  {
    "live": false,
    "played": true,
    "competition": "Campeonato Mineiro 1",
    "date": "Aug 30",
    "time": "3:00 AM",
    "game": "Tombense 0 - 1 Atlético Mineiro",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": true,
    "competition": "Brasileirão",
    "date": "Sep 3",
    "time": "7:00 AM",
    "game": "Atlético Mineiro 3 - 0 São Paulo",
    "tvs": [
      "SporTV",
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": true,
    "competition": "Brasileirão",
    "date": "Sep 6",
    "time": "7:30 AM",
    "game": "Coritiba 0 - 1 Atlético Mineiro",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": true,
    "competition": "Brasileirão",
    "date": "Sep 9",
    "time": "8:30 AM",
    "game": "Santos 3 - 1 Atlético Mineiro",
    "tvs": [
      "Premiere FC Brasil"
    ]
  }
];

const ATLETICO_LIVE_GAME = {
  "live": true,
  "played": false,
  "competition": "Brasileirão",
  "date": "Sep 13",
  "time": "8:00 AM",
  "game": "Atlético Mineiro 2 - 1 RB Bragantino",
  "tvs": ["Premiere FC Brasil"]
};

const ATLETICO_FUTURE_GAMES = [
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Sep 19",
    "time": "8:00 AM",
    "game": "Atlético Goianiense vs Atlético Mineiro",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Sep 26",
    "time": "8:00 AM",
    "game": "Atlético Mineiro vs Grêmio",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Oct 4",
    "time": "7:30 AM",
    "game": "Atlético Mineiro vs Vasco da Gama",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Oct 7",
    "time": "3:00 AM",
    "game": "Fortaleza vs Atlético Mineiro",
    "tvs": [
      "Premiere FC Brasil"
    ]
  },
  {
    "live": false,
    "played": false,
    "competition": "Brasileirão",
    "date": "Oct 11",
    "time": "3:00 AM",
    "game": "Atlético Mineiro vs Goiás",
    "tvs": [
      "Premiere FC Brasil"
    ]
  }
];

const ATLETICOS_GAMES = ATLETICO_PAST_GAMES.concat([ATLETICO_LIVE_GAME]).concat(ATLETICO_FUTURE_GAMES);

const ALL_GAMES = SANTOS_GAMES.concat(ATLETICOS_GAMES);

const LIVE_MATCHES = [
  SANTOS_LIVE_GAME,
  ATLETICO_LIVE_GAME
];

const LIVE_RESULTS = [
  {
    "team1": "Santos",
    "team2": "Olimpia",
    "score":"0 - 0"
  },
  {
    "team1": "Atlético Mineiro",
    "team2": "RB Bragantino",
    "score":"2 - 1"
  }
];

const LIVE_RESULTS_EVENT_FORMAT = [
  {
    "team1": "Santos",
    "team2": "Olimpia",
    "score":"0 - 0",
    "team1Id": "99"
  },
  {
    "team1": "Atlético MG",
    "team2": "RB Bragantino",
    "score":"2 - 1",
    "team1Id": "13"
  }
];

const INVALID_LIVE_RESULT = {
  "team1": "Atlético Mineiro",
  "team2": "RB Bragantino",
};

const AVAILABLE_TEAMS = [
  {
    "adapterOutputName": "Santos",
    "id": "99",
    "adapterInputName": "Santos",
    "name": "Santos",
    "country": "brazil",
    "sport": "football"
  },
  {
    "adapterOutputName": "Atlético Mineiro",
    "id": "13",
    "adapterInputName": "Atletico-Mineiro",
    "name": "Atlético MG",
    "country": "brazil",
    "sport": "football"
  },
  {
    "adapterOutputName": "Vasco",
    "id": "55",
    "adapterInputName": "Vasco",
    "name": "Vasco",
    "country": "brazil",
    "sport": "football"
  }
];

const LIST_OF_TEAMS_NAMES_FOR_INPUT = [
  "Santos",
  "Atletico-Mineiro",
  "Vasco"
];


module.exports = {
  ALL_GAMES,
  LIVE_MATCHES,
  LIVE_RESULTS,
  INVALID_LIVE_RESULT,
  AVAILABLE_TEAMS,
  LIST_OF_TEAMS_NAMES_FOR_INPUT,
  LIVE_RESULTS_EVENT_FORMAT,
};
