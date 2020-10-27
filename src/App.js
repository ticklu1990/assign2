
import React,{Component} from 'react';

import { BrowserRouter as Router, Route, Link, Redirect,withRouter } from "react-router-dom";


const fakeAuth = {

  isAuthenticated: false,
  authenticate(cb) {
  this.isAuthenticated = true 
  setTimeout(cb,100)//fake async 
  },

  signout(cb){
  this.isAuthenticated = false
  setTimeout(cb,100)//fake async
  } 
}



//const Public = () => <h3>Public</h3>
//const Protected = () => <h3>Protected</h3>

const Customer = () => <h3>Customer</h3>

const Admin = () => <h3>Admin</h3>

const Home = () => <h3>Home</h3>


class Login extends React.Component{

state = {
  redirectToReferrer: false
}
login = () => {
  fakeAuth.authenticate(()=>{
    this.setState(()=>({
      redirectToReferrer:true
    }))
  })
}

render(){

 const { redirectToReferrer } = this.state 
 const { from } = this.props.location.state || { from: { pathname: '/' } }

 if(redirectToReferrer === true){
   return(
     <Redirect to={from} />
   )
 }

return(

<div>
<p>You must log in as {from.pathname} to view this page</p>
<button onClick={this.login}>Log in</button>
</div>)

} 

}



const PrivateRoute = ({ component: Component, ...rest }) =>(
  <Route {...rest} render = {(props)=>(

    fakeAuth.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to ={{
      pathname: '/login',
      state: { from: props.location }
    }} 

    />
  )}/>
)


const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true
  ? <p>
    Welcome! <button onClick ={()=>{


    fakeAuth.signout(()=> history.push('/'))  

    }}>Sign Out</button>
    </p>
  : <p>You are not logged in.</p>   
)
)

class App extends Component{
render(){

return(

<Router>
<div>
<AuthButton />
 <ul>
      <li><Link to='/home'>Home Page</Link></li> 
      <li><Link to='/customer'>Customers Page</Link></li>
       <li><Link to='/admin'>Admin Page</Link></li>
  </ul> 


<Route path='/home' component ={Home}/>
<Route path='/login' component ={Login}/>

<PrivateRoute path='/customer' component ={Customer}/>
<PrivateRoute path='/admin' component={Admin}/> 


</div> 


</Router>

)


}
}


export default App;