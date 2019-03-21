import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import '../App.css';
import PostList from './PostList';
import ForumList from './FourmList';
import ForumNavBar from "./ForumNavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {click: true}
  }
  render() {
    console.log(this.props);
    return (
      <div className={'container'}>
        <ForumNavBar/>
        <Router>
          <Route path={'/'} exact
                 component={()=> <h1>Home</h1>}
          />
          <Route path={'/posts'} component={PostList}/>
          <Route path={'/forums'} component={ForumList}/>
        </Router>
      </div>
    );
  }
}

export default App;
