import Navbars from "./Navbar";
import Home from "../containers/home/Home";
import Dashboard from "../containers/Dashboard";

import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import checkUser from '../functions/getUser';

export default class App extends Component {

  state = {
    loggedIn: false,
    fetchingUser: false
  }

  componentDidMount = () => {
    checkUser()
      .then(res => {
        if (res.data && res.data.username) {
          this.setState({
            loggedIn: true,
            fetchingUser: true
          })
        }
      }).catch(err => {
        console.log(err)
        this.setState({
          loggedIn: false,
          fetchingUser: true
        })
      })
  }
  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        <Switch>

          <Route exact path="/Dashboard">
            <Dashboard />
          </Route>



          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> :
              <Home />}
          </Route>

          <Route >
            <NotFound />
          </Route>

        </Switch>
      </Router >
    );
  }
}

function NotFound() {
  return (
    <p>Error Not Found</p>
  )
}

// // function Home() {
// //   return <h2>Home</h2>;
// // }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//       the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           {/* <Topic /> */}
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// // function Topic() {
// //   let { topicId } = useParams();
// //   return <h3>Requested topic ID: {topicId}</h3>;
// // }