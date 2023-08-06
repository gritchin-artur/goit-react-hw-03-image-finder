import { Div, LoadButton } from "./Button.styled";
import propTypes from "prop-types";

const Button = ({ onClick }) => (
  <Div>
    <LoadButton type="button" onClick={onClick}>
      Load more
    </LoadButton>
  </Div>
);
Button.propTypes = {
  onClick: propTypes.func,
};

export default Button;
