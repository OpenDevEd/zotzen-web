import "./styles.scss";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../../common/Button";
import Input from "../../common/Input";
import SelectInput from "../../common/SelectInput";
import { useDispatch } from "react-redux";
import { createRecord } from "../../../redux/actions/records/createRecord";
const RecordForm = () => {
  const inputs = {
    title: "",
    author: "",
    date: "",
    outputCategory: "",
    outputCategoryNumber: "",
    primaryTeam: "",
    documentURL: "",
  };
  const [form, setForm] = useState(inputs);
  const [formErrors, setFormErrors] = useState(inputs);

  const dispatch = useDispatch();

  const validate = () => {
    if (!form.title.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        title: "Title should not be empty",
      }));
    }

    if (!form.author.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        author: "Author should not be empty",
      }));
    }

    if (!form.date.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        date: "Date should not be empty",
      }));
    }

    if (!form.outputCategory.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        outputCategory: "Output category should not be empty",
      }));
    }
    if (!form.outputCategoryNumber.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        outputCategoryNumber: "Output category number should not be empty",
      }));
    }
    if (!form.primaryTeam.trim().length) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        primaryTeam: "Primary team should not be empty",
      }));

      if (!form.documentURL.trim().length) {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          documentURL: "Document URl should not be empty",
        }));
      }
    }
  };

  const onInputValueChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    validate();
    if (!Object.values(formErrors).some((value) => value.length > 0)) {
      createRecord(form)(dispatch);
    }
  };

  return (
    <Form onSubmit={onSubmitForm} className="record-form">
      <Input
        value={form.title}
        type="text"
        placeholder="Enter the title"
        onChange={onInputValueChange}
        name="title"
        error={formErrors.title}
        label="Enter the title"
      />

      <Input
        value={form.author}
        type="text"
        placeholder="Last Name, First Name; Last Name, First Name"
        onChange={onInputValueChange}
        name="author"
        error={formErrors.author}
        label="Author(s)"
      />

      <Row>
        <Col xs={12} s={12} lg={6}>
          <SelectInput
            placeholder="Select Category"
            onChange={onInputValueChange}
            name="outputCategory"
            error={formErrors.outputCategory}
            label="Output category"
            options={["Silver", "Gold", "Black"]}
            value={form.outputCategory}
          />
        </Col>

        <Col xs={12} s={12} lg={6}>
          <Input
            value={form.outputCategoryNumber}
            type="text"
            placeholder="Enter category number"
            onChange={onInputValueChange}
            name="outputCategoryNumber"
            error={formErrors.outputCategoryNumber}
            label="Category number"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} s={12} lg={6}>
          <Input
            value={form.date}
            type="date"
            placeholder="Select the date"
            onChange={onInputValueChange}
            name="date"
            error={formErrors.date}
            label="Date"
          />
        </Col>
        <Col xs={12} s={12} lg={6}>
          <SelectInput
            placeholder="Select Primary Team"
            onChange={onInputValueChange}
            name="outputCategory"
            error={formErrors.primaryTeam}
            label="Primary Tearm"
            options={["Research", "Engagement", "Innovation", "Central Services", "Other"]}
            value={form.primaryTeam}
          />
        </Col>
      </Row>
      <Input
        value={form.documentURL}
        type="text"
        placeholder="Enter URL to working document (Google Drive)"
        onChange={onInputValueChange}
        name="documentURL"
        error={formErrors.documentURL}
        label="URL to working document (Google Drive)"
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default RecordForm;
