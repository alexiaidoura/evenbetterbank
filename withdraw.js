//works, but allows overdrawn acct

function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [balance, setBalance] = React.useState(''); //I'm not setting the balance
  //const ctx = React.useContext(UserContext);  

  function handle(){
    //console.log('handle ' + email,amount,balance); //this works but no balance -- we don't need to set, but we need to get from db
    //const user = ctx.users.find((user) => user.email == email);
    //const amount = 0 - amount;//type is string, not number
    //const withdrawal = -Number(amount);
    var amountnumneg = 0 - Number(amount);
    const url = `/account/update/${email}/${amountnumneg}`; //correct
    //console.log('update ' + amountnum + ' ' + url); //this works from browser directly http://localhost:3000/account/update/testperson3@mit.edu/10
      (async () => {
        var res = await fetch(url);
        var data = await res.json(); 
        console.log('found data ' + data); //got here

        if (!data) { //couldn't find user, fails
        props.setStatus('no such user');      
        return;      
        }
      })();
      
    //   if (!data) { //couldn't find user, fails
    //   props.setStatus('fail!')      
    //   return;      
    // }

  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
