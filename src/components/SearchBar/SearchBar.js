import { Component } from "react";
import { Header, Form, Button, Span, Input } from "./SearchBar.styled";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import propTypes from "prop-types";

class SearchBar extends Component {
  state = {
    seachTopic: "",
  };

  //seach topic images
  handleChange = (e) => {
    this.setState({ seachTopic: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    const { seachTopic } = this.state;
    e.preventDefault();
    if (seachTopic.trim() === "") {
      Notify.failure("Please enter what do you find");
      return;
    }
    this.props.onSubmit(seachTopic);
    this.setState({ seachTopic: "" });
  };

  render() {
    const { seachTopic } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="serchQuery"
            value={seachTopic}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default SearchBar;
