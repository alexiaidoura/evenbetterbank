// import { Auth0Provider} from "@auth0/auth0-react";
// import { useAuth0 } from "@auth0/auth0-react";

//import Spa from './index.js';

function Spa() {

  //const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <HashRouter>
      <div>
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <NavBar/>        
        <Header />
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        <Footer />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}
//<UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);

/* <div>
            <ul>
            <li>
              <button onClick={loginWithPopup}>Login with Popup</button>
            </li>
            <li>
              <button onClick={loginWithRedirect}>Login with Redirect</button>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            </ul>
            <h3>User is { isAuthenticated ? "Logged in" : "Not logged in" }</h3>
            { isAuthenticated && (
            <pre style={{textAlign: 'start'}}>{JSON.stringify(user, null, 2)}</pre>
            )}
            </div> */

           /*  ReactDOM.render(
              //<Auth0Provider
              //   domain = "dev-x8fump91.us.auth0.com"
              //   clientId = "Uz7a0n47n4vo9r1rN7KEW9V8nr9CRkHY"
              //   redirectUri = {window.location.origin}
              // >
              <Spa/>
              // </Auth0Provider>
              document.getElementById('root')
            ); */