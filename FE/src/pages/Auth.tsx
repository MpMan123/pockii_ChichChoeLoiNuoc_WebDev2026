import './Auth.css';

const Auth = () => {
  return (
    <div className="auth-page">
      <div className="auth-container glass animate-fade-in">
         <div className="auth-header">
            <div className="logo-icon animate-pulse mx-auto mb-4" style={{width: 48, height: 48}}></div>
            <h2>Welcome back</h2>
            <p>Pockii is the Serene Ledger</p>
         </div>

         <div className="auth-social">
            <button className="btn-social google">
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20}/>
               Google
            </button>
            <button className="btn-social facebook">
               <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" width={20}/>
               Facebook
            </button>
         </div>
         
         <div className="divider">
            <span className="divider-text">OR</span>
         </div>

         <form className="auth-form">
            <div className="form-group">
               <label>EMAIL ADDRESS</label>
               <input type="email" className="input-field" placeholder="name@example.com" />
            </div>
            
            <div className="form-group">
               <div className="flex-header">
                  <label>PASSWORD</label>
                  <a href="#" className="forgot-link">Forgot?</a>
               </div>
               <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            
            <button type="button" className="btn btn-primary w-full justify-center mt-2 pt-3 pb-3">Log In</button>
         </form>

         <p className="auth-footer text-center mt-6">
            Don't have an account? <a href="#">Sign up for free</a>
         </p>
      </div>
    </div>
  );
};

export default Auth;
