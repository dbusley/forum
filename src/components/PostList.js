import React, {Component} from "react";
import {get} from "../js/halClient";
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import {Button, ButtonGroup} from "react-bootstrap";

class Post extends Component {
  constructor(props) {
    super(props);
    const forum = queryString.parse(this.props.location.search).forum;
    this.state = {document: {}, loading: true, forum: forum, page:0};
  }

  navigatePage(pageNumber) {
    this.setState({loading: true});
    get(['posts', 'search', 'findByForum_Id'])
      .withTemplateParameters({projection: 'summary', forumId: this.state.forum, page:pageNumber})
      .getResource()
      .result
      .then(result => this.setState({document: result, loading: false, page: pageNumber}));
  }


  render() {
    if (this.state.loading === true) {
      return <ReactLoading className={'centered'} type={'bars'} width={'10%'} height={'10%'} color={'darkred'}/>;
    }
    const posts = this.state.document._embedded.posts.map(post => <div key={post._links.self.href}
                                                                       className={'post-div'}>{post.message}</div>);
    return <div>
      {posts}
      <ButtonGroup>
        <Button variant="secondary" disabled={typeof this.state.document._links.first === 'undefined'}
                onClick={() => this.navigatePage(0)}>First</Button>
        <Button variant="secondary" disabled={typeof this.state.document._links.prev === 'undefined'}
                onClick={() => this.navigatePage(this.state.page - 1)}>Previous</Button>
        <Button variant="secondary" disabled={typeof this.state.document._links.next === 'undefined'}
                onClick={() => this.navigatePage(this.state.page + 1)}>Next</Button>
        <Button variant="secondary" disabled={typeof this.state.document._links.last === 'undefined'}
                onClick={() => this.navigatePage(this.state.document.page.totalPages - 1)}>Last</Button>
      </ButtonGroup>
    </div>
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