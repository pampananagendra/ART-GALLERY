import logo from '../logo.svg';
import '../App.css';

function Login() {
    
  function handleForm(event) {
    alert("form submitted");
    event.preventDefault();
    const data = new FormData (event.currentTarget);
    const un = data.get("un");
    const pw = data.get("pw");
    console.log(un+" --- "+pw);
  }

  return (
          <div style={{ border:"1px solid red" }} className="App-login">
            <p style={{ border:"1px solid blue" }}>Login goes here</p>
            <form style={{ border:"1px solid green" }} onSubmit={handleForm}>
              User Name: <input type="text" placeholder='un' name="un"/>
              <br/>
              Password: <input type="password" placeholder='pw' name="pw"/>
              <br/><br/>
              <input type="submit" value="Login" />
            </form>
          </div>
  );
}

export default Login

