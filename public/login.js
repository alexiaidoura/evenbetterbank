// 0Auth2 for login/context?
// consider firebase for auth of front and back end
// context for email in header  -- token/cookie

//const { default: LoginButton } = require("./loginbutton");


function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  //const { currentUser, setCurrentUser } = React.useContext(UserContext);

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  //const [user, setUser] = React.useState(null);

  //var ctx = React.useContext(UserContext);  
  var { currentUser, setCurrentUser } = React.useContext(UserContext);
  
  function handle(){
    

    //const user = ctx.users.find((user) => user.email == email);
    //const thisUser = currentUser.users.find((thisUser) => thisUser.email == email);
    //console.log(user); //undefined 
    console.log(email, password); //works -- is this from the form or from the db???? from form, I think
    //if (!user) { //not finding user so always ends here
    const url = `/account/findOne/${email}/${password}`; //correct
    console.log('url login ' + url); //correct and this direct in browser returns correct data http://localhost:3000/account/findOne/testperson3@mit.edu/secret
      (async () => {
        var res = await fetch(url);
        const user = await res.json(); 
        console.log('found data ' + user); //got here
        //() => {setCurrentUser(user)}; too early to set here -- don't know if it's a match


    if (!user) { 
      console.log('one')      
      props.setStatus('no such user')      
      return;      
    }
    if (user.password == password) { 
      console.log('two' + user.email);            
      props.setStatus('');
      props.setShow(false);
      //setCurrentUser(user);
      //setEmail(user.email);
      // useEffect(() => {
      //   props.setUser(user);
      // },[]);
      //user = data;
      //setUser(JSON.stringify(user));
      console.log('user ' + JSON.stringify(user));
      //() => {setCurrentUser(this.user)};
      console.log('currentUser ' + JSON.stringify(currentUser));
      return user;      
    } 
    console.log('three')          
    props.setStatus('password incorrect');  

      })();
      
      () => {setCurrentUser(user)}; 
          
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" 
      onClick={handle} 
    >
      Login
    </button>

   
  </>);
}