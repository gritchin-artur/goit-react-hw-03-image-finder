import { Header, Form, Button, Span, Input } from "./SearchBar.styled";

import propTypes from "prop-types";

const SearchBar = ({ onSubmit, value, onChange }) => (
  <Header>
    <Form onSubmit={onSubmit}>
      <Button type="submit">
        <Span>Search</Span>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="serchQuery"
        value={value}
        onChange={onChange}
      />
    </Form>
  </Header>
);

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default SearchBar;
