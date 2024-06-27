export const environment = {
    production: false,
    auth: {
        issuer: 'https://localhost:10001',
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
        userImageUrl: "https://i.pravatar.cc/64"
    },
    events:{
        apiEndpoint: 'https://localhost:12001'
    },
    identity:{
        apiEndpoint: 'https://localhost:11001'
    },
    webPush:{
        apiEndpoint: 'https://localhost:12001',
        publicKey: "BA97uWDYHxs_wcgUwH6PFDiJzKvse6GZ4jlDdWgRjkWl7AOIBVkuKZ65wGQ0gK4tzoVxO0emc_tEFO7CZYCwqxI"
    }
};
