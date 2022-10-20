// works (but doesn't fail nicely if user not found)

function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  //const ctx = React.useContext(UserContext);  

  function handle(){
    //console.log(email,balance);
    const url = `/account/find/${email}`; 
      (async () => {
        var res = await fetch(url);
        var user = await res.json();
        //var balance = props.setBalance(user[0].balance);
        //console.log('this data balance ' + user[0].balance);
        //setBalance(user[0].balance); 
        //console.log('balance ' + user[0].balance);
        props.setStatus('Your balance is: ' + user[0].balance.toFixed(2));     //TODO: format 2 decimal places  
        props.setShow(false);
      })();
    // setBalance(user[0].balance); 
    // console.log('balance ' + user[0].balance);
    // props.setStatus('Your balance is: ' + user[0].balance);     //TODO: not displaying balance  
    // props.setShow(false);
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}