declare global {
  namespace Express {
    class Request {
      user: User;
    }
  }
}
