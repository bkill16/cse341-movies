declare namespace Express {
    interface Request {
      oidc: {
        isAuthenticated(): boolean;
        // Add other oidc properties and methods here if needed
      };
    }
  }
  