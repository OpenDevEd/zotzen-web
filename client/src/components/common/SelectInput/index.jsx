import { Form } from "react-bootstrap";

const SelectInput = ({ options, value, label, placeholder, ...rest }) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control as="select" value={value} {...rest}>
        <option key="placeholder" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectInput;
