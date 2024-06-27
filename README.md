# TcpeventsClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve --port 4200 --ssl --ssl-cert .\cert\aspnetapp.crt --ssl-key .\cert\aspnetapp-decrypted.key` for a dev server. Navigate to `https://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Cert install

Install the `.\cert\aspnetapp.crt` to trust the server or you can use your certificate and specify in `ng serve` command above.

## Configuration

Please go to `/src/environments/environment.ts` and `/src/environments/environment.development.ts`

```json

export const environment = {
    production: false,
    auth: {
        issuer: 'https://localhost:10001', // the authority server
        redirectUri: 'https://localhost:4200/auth/login-completed',
        postLogoutRedirectUri: 'https://localhost:4200/auth/logout-completed',
        clientId: 'events_client',
        responseType: 'code',
        scope: 'openid profile roles events-api identity-api',
        basePath : 'https://localhost:4200/auth'
    },
    layout:{
        favicon: "/assets/images/favicon-cross.ico",
        brand: "Cross",
        brandLogo: "/assets/images/logo-cross.svg",
        defaultMenuOpen: true,
        userImageUrl: "https://i.pravatar.cc/64" // fake avatar for user
    },
    events:{
        apiEndpoint: 'https://localhost:12001' // Events API
    },
    identity:{
        apiEndpoint: 'https://localhost:11001' // Identity admin API
    },
    webPush:{
        apiEndpoint: 'https://localhost:12001', // Events API
        publicKey: "BA97uWDYHxs_wcgUwH6PFDiJzKvse6GZ4jlDdWgRjkWl7AOIBVkuKZ65wGQ0gK4tzoVxO0emc_tEFO7CZYCwqxI"
    }
};

```
