interface IAuthService {
  clearFields: () => void;
  getResponse: () => object | null;
  initiateLoginSession: () => void;
  sendLoginCredentails: () => void;
  completeLoginSession: () => void;
}

export default IAuthService;
