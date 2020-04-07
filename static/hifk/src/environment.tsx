const ENV = process.env.REACT_APP_ENV;

let complement;
if (ENV === 'prod') {
  complement = '';
} else if (ENV === 'staging') {
  complement = 'staging';
} else {
  complement = 'dev';
}

const BASE_URL = `https://api${complement}.goalstracker.info`;

export const routes = {
  teams: `${BASE_URL}/teams`,
  subscription: `${BASE_URL}/subscriptions`
}