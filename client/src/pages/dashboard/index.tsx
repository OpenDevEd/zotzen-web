import React, { useState } from 'react';
import { Input, Select, message } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQuery, useMutation } from 'react-query';
import CustomButton from '../../components/Button';
import InputLabel from '../../components/InputLabel';
import UserLayout from '../../components/Layout/UserLayout';
import Requests from '../../services/requests';

const { Option } = Select;

const INITIAL_VALUES = {
  title: '',
  author: '',
  category: '',
  reportNumber: '',
  date: '',
  primaryTeam: '',
  documentURL: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required('* required'),
  author: yup.string().required('* required'),
  category: yup.string().required('* required'),
  reportNumber: yup.string(),
  date: yup.date().required('* required'),
  primaryTeam: yup.string().required('* required'),
  documentURL: yup
    .string()
    .url('* invalid url')
    .matches(/docs.google.com/, 'Is not Google Docs URL')
    .required('* required'),
});

const Dashboard: React.FC = () => {
  const team = [
    'Research',
    'Engagement',
    'Innovation',
    'Central Services',
    'Other',
  ];
  const [resMessage] = useState<string>();
  let options: Array<Record<string, any>> = [];

  const {
    data: dataa,
    isSuccess,
    isLoading,
  } = useQuery<any>('categories', () => Requests.getCategories());

  if (isSuccess && dataa) {
    options = dataa?.categories;
  }

  const {
    mutate,
    isLoading: cIsLoading,
    data: cData,
    isSuccess: cIsSuccess,
  }: any = useMutation((data: Record<string, any>) => Requests.createOutput(data));

  const copyToClipboard = (msg: string): void => {
    navigator.clipboard.writeText(msg);
    message.success('Copied to clipboard. You can paste it in a document');
  };

  if (cIsSuccess) console.log(cData, 'returned data');

  const {
    values,
    errors,
    handleSubmit,
    // setErrors,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: (_values) => {
      const category = options.find((item) => item.key === _values.category);
      const data = {
        ...values,
        category: undefined,
        categoryName: category?.name,
        categoryNamekey: category?.key,
      };

      mutate(data);
      resetForm({
        values: INITIAL_VALUES,
      });
    },
  });

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Create Record</h1>
          <p className="text-xs text-gray-500">New Zotero / Zenodo Record</p>
        </div>
        <form className="magnetic-form w-6/12">
          <div className="my-6">
            <InputLabel label="Title">
              <Input
                id="title"
                className="floating-input rounded-md"
                placeholder="Title"
                value={values.title}
                onChange={handleChange('title')}
              />
            </InputLabel>
            <span className="text-sm text-red-500">{errors.title}</span>
          </div>
          <div className="my-6">
            <InputLabel label="Authors">
              <Input
                className="floating-input rounded-md"
                placeholder="Last Name, First Name; Last Name, First Name"
                value={values.author}
                onChange={handleChange('author')}
              />
            </InputLabel>
            <span className="text-sm text-red-500">{errors.author}</span>
          </div>
          <div className="my-6">
            <Select
              className="floating-input rounded-md"
              placeholder="Select Category"
              loading={isLoading}
              onChange={(value) => setFieldValue('category', value)}
            >
              {[...options]?.map((item) => (
                <Option value={item.key} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <span className="text-sm text-red-500">{errors.category}</span>
          </div>
          <div className="my-6">
            <InputLabel label="Report number">
              <Input
                className="floating-input rounded-md"
                placeholder="Report number (Optional)"
                value={values.reportNumber}
                onChange={handleChange('reportNumber')}
              />
            </InputLabel>
            <span className="text-sm text-red-500">{errors.reportNumber}</span>
          </div>
          <div className="my-6">
            <InputLabel label="">
              <Input
                type="date"
                className="floating-input rounded-md"
                placeholder="Date"
                value={values.date}
                onChange={handleChange('date')}
              />
            </InputLabel>
            <span className="text-sm text-red-500">{errors.date}</span>
          </div>
          <div className="my-6">
            <Select
              className="floating-input rounded-md"
              placeholder="Select Primary Team"
              onChange={(value) => setFieldValue('primaryTeam', value)}
            >
              {team.map((item) => (
                <Option value={item} key={item}>
                  {item}
                </Option>
              ))}
            </Select>
            <span className="text-sm text-red-500">{errors.primaryTeam}</span>
          </div>
          <div className="my-6">
            <InputLabel label="URL to working document (Google Drive)">
              <Input
                className="floating-input rounded-md"
                placeholder="https://docs.google.com/"
                value={values.documentURL}
                onChange={handleChange('documentURL')}
              />
            </InputLabel>
            <span className="text-sm text-red-500">{errors.documentURL}</span>
          </div>

          <CustomButton
            block
            size="medium"
            classes="text-lg"
            onClick={handleSubmit}
            loading={cIsLoading}
            disabled={cIsLoading || isLoading}
            buttonType="button"
          >
            Create Record
          </CustomButton>
        </form>
        <div className="w-6/12 my-2">
          <p className="text-base text-black-300">
            {cIsSuccess && (
              <div>
                <span>
                  <strong>
                    Please copy the following reference into your google
                    document:
                  </strong>
                  <br />
                  {cIsSuccess ? cData?.data?.citation : ''}
                </span>
                <div>
                  <CustomButton
                    buttonType="button"
                    size="small"
                    classes="text-sm"
                    onClick={() => copyToClipboard(cIsSuccess ? cData?.data?.citation : '')}
                  >
                    Copy
                  </CustomButton>
                </div>
              </div>
            )}
            {cIsLoading
              && 'This can take up to 10 seconds to complete, please be patient...'}
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
