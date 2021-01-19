import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import RecordForm from "../RecordForm";
import SideBar from "../SideBar";
const NewRecord = (props) => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <SideBar />
        </Col>
        <Col xs={12} md={6}>
          <h4 className="ml-auto">
            Create a new Zotero/Zenodo record
          </h4>
          <br></br>
          <RecordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default NewRecord;
