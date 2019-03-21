import React, {Component} from "react";
import {get} from "../js/halClient";
import queryString from 'query-string';

class Post extends Component {
  constructor(props) {
    super(props);
    const forum = queryString.parse(this.props.location.search).forum;
    this.state = {document: {}, loading: true, forum: forum};
  }

  render() {
    if (typeof this.state.document._embedded == 'undefined') {
      return '';
    }
    console.log(this.state.document);
    return this.state.document._embedded.posts.map(post => <div key={post._links.self.href}
                                                                className={'post-div'}>{post.message}</div>);
  }

  componentWillMount() {
    get(['posts', 'search', 'findByForum_Id'])
      .withTemplateParameters({projection: 'summary', forumId: this.state.forum})
      .getResource()
      .result
      .then(result => this.setState({document: result, loading: false})).catch(() => this.setState({error: true}));
  }
}

export default Post;