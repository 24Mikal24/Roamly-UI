export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',
    keycloakConfig: {
      url: 'http://localhost:8081',
      realm: 'roamly',
      clientId: 'roamly-ui'
    },
    postLogoutRedirectUri: 'http://localhost:4200'
  };