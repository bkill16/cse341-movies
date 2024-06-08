declare namespace Express {
    interface Request {
      oidc: {
        isAuthenticated: () => boolean;
      };
    }
  }