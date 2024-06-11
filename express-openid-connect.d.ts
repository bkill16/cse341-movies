declare global {
    namespace Express {
      interface Request {
        oidc: {
          isAuthenticated(): boolean;
          user?: {
            sub: string;
            email: string;
          };
          logout(): void;
        };
      }
    }
  }