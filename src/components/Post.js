import {Component} from "react";
import Form from "react-jsonschema-form";
import PostUiSchema from "../json/postForm";
import {get, put, profile} from "../js/halClient";
import React from "react";

class Post extends Component {
  createPost = (formData) => {
    put(this.state.document._links.self.href, formData).then(result => console.log(result)).catch((reason => console.error(reason)));
  };

  constructor(props) {
    super(props);
    this.state = {document: {}};
  }

  render() {
    return (
      <div className={'container'}>
        {this.state.schema && <Form schema={this.state.schema}
                                    formData={this.state.document}
                                    uiSchema={PostUiSchema}
                                    onSubmit={(formData) => this.createPost(formData)}/>}
      </div>
    );
  }

  componentDidMount() {
    get(['posts', 'posts[0]', 'self']).getResource().result.then((result) => {
      this.setState({document: result});
    }).catch((reject) => console.error(reject));
    profile(['posts'])
      .then((result) =>
        result
          .jsonHal()
          .getResource()
          .result
          .then((result) => {
            result['$schema'] = 'http://json-schema.org/draft-07/schema#';
            this.setState({schema: result})
          }))
      .catch((reject) => console.error(reject));
  }
}

export default Post;