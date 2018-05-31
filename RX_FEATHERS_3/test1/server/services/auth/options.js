module.exports = {
  authOptions() {
    return {
     path: '/authentication', // the authentication service path
     header: 'Authorization', // the header to use when using JWT auth
     entity: 'user', // the entity that will be added to the request, socket, and context.params. (ie. req.user, socket.user, context.params.user)
     service: 'users', // the service to look up the entity
     passReqToCallback: true, // whether the request object should be passed to the strategies `verify` function
     session: false, // whether to use sessions
     secret: 'supersecret', // hashing of passing REQUIRED
     cookie: {
      enabled: false, // whether cookie creation is enabled
      name: 'feathers-jwt', // the cookie name
      httpOnly: false, // when enabled, prevents the client from reading the cookie.
      secure: true // whether cookies should only be available over HTTPS
     },
     jwt: {
      header: { typ: 'access' }, // by default is an access token but can be any type
      audience: 'https://yourdomain.com', // The resource server where the token is processed
      subject: 'anonymous', // Typically the entity id associated with the JWT
      issuer: 'feathers', // The issuing server, application or resource
      algorithm: 'HS256', // the algorithm to use
      expiresIn: '1d' // the access token expiry
     }
   };
  }
}
