import { Button } from "react-bootstrap";
import "./styles.scss";

const CustomButton = ({ onClick, children, loading, ...rest }) => {
  return (
    <Button
      onClick={onClick}
      loading={loading}
      variant="orange"
      className="right-floated"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
