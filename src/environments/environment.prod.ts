export const environment = {
    production: true,
    apiUrl: 'https://api.roamly.com', // To Do: need to configure this 
    keycloakConfig: {
      url: 'https://auth.roamly.com', // To Do: need to configure this
      realm: 'roamly',
      clientId: 'roamly-ui'
    },
    postLogoutRedirectUri: 'http://roamly.com'
  };