import { Form } from "react-bootstrap";
const Input = ({ label, error, ...rest }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} autoComplete="off" />
      {error && <p style={{ color: "#ff5c00" }}>{error}</p>}
    </Form.Group>
  );
};

export default Input;
