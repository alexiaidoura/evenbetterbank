

//TODO: in div "header", display logged in email to right side above nav bar (currently shows the whole string)

function Header(){
    //const [data, setData] = React.useState('');
    //const ctx = React.useContext(UserContext); 
    //console.log(ctx);
    //const user = ctx.users.find((user) => user.email == email);
    const currentUser = React.useContext(UserContext);
    console.log('currentUser ' + currentUser, currentUser.users[0].email);
    // console.log(JSON.stringify(ctx)); //I need the object, not the string (it is pulling in the string, so it is getting to this component)
    //const user = JSON.stringify(ctx);
    //const email = data;
    //console.log('user ' + user);
    //console.log('email ' + email); //undefined -- have to get from object, not string

    return (
        <div className='header'>
            <small className='text-muted float-right'>{currentUser.users[0].email}</small>
        </div>
    );
}

