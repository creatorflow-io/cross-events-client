export const environment = {
    production: true,
    auth: {
        issuer: 'https://host.docker.internal:44316',
        redirectUri: 'https://localhost:4200/auth/login-completed',
        postLogoutRedirectUri: 'https://localhost:4200/auth/logout-completed',
        clientId: 'events_client',
        responseType: 'code',
        scope: 'openid profile roles events-api',
        basePath : 'https://localhost:4200/auth',
    },
    layout:{
        favicon: "/assets/images/favicon-cross.ico",
        brand: "Cross",
        brandLogo: "/assets/images/logo-cross.svg",
        defaultMenuOpen: true,
        userImageUrl: "https://i.pravatar.cc/64"
    },
    events:{
        apiEndpoint: 'https://localhost:44393'
    },
    webPush:{
        apiEndpoint: 'https://localhost:44393',
        publicKey: "BA97uWDYHxs_wcgUwH6PFDiJzKvse6GZ4jlDdWgRjkWl7AOIBVkuKZ65wGQ0gK4tzoVxO0emc_tEFO7CZYCwqxI"
    }
};