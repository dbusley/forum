import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {Button, ButtonGroup} from 'react-bootstrap';
import {get} from '../js/halClient';
import '../App.css';

class ForumList extends Component {
  navigatePage(pageNumber) {
    this.setState({loading: true});
    get('forums')
      .withTemplateParameters({projection: 'summary', page: pageNumber})
      .getResource()
      .result
      .then(result => this.setState({document: result, loading: false, page: pageNumber}));
  }

  constructor(props) {
    super(props);
    this.state = {page: 0, loading: true, error: false};
  }

  render() {
    if (this.state.error === true) {
      return <h1>Uh oh... this is super broken...</h1>
    }
    if (this.state.loading === true) {
      return <ReactLoading className={'centered'} type={'bars'} width={'10%'} height={'10%'} color={'darkred'}/>;
    }
    const forumNames = this.state.document._embedded['forums'].map(forum => <tr key={forum._links.self.href}
                                                                                onClick={() => {
                                                                                  this.props.history.push('/posts?forum=' + forum._links.self.href.substring(forum._links.self.href.lastIndexOf('/') + 1));
                                                                                }}>
      <td>{forum.topic}</td>
      <td>{forum.postCount}</td>
    </tr>);
    return <div className={'table-div'}>
      <table className={'table table-striped table-hover forum-table'}>
        <thead>
        <tr>
          <td><b>Topic</b></td>
          <td><b>Number of posts</b></td>
        </tr>
        </thead>
        <tbody>{forumNames}</tbody>
      </table>
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
    </div>;
  }

  componentWillMount() {
    get('forums')
      .withTemplateParameters({projection: 'summary'})
      .getResource()
      .result
      .then(result => this.setState({document: result, loading: false})).catch(() => this.setState({error: true}));
  }
}

export default ForumList;