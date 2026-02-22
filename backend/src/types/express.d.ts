// backend/src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        fullName: string;
        email: string;
      };
      vendor?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export {};