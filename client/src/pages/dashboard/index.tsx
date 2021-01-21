import React, { useEffect } from 'react';
import { Input, Select } from 'antd';
import CustomButton from '../../components/Button';
import InputLabel from '../../components/InputLabel';
import UserLayout from '../../components/Layout/UserLayout';
import { saveNewOutput, fetchOutputCategories } from '../../actions/outputActions';

const { Option } = Select;

const submitData = () => {
  console.log('title');
};

const Dashboard = () => {

  // let categories = {};
  // const fetchCategories = async() => {
  //   let categories = await fetchOutputCategories();
  //   console.log('>>>>>>', categories);
  //   return categories;
  // };
  // fetchCategories();
  

  // const requestData:any = {
  //   title: "Education of Js",
  //   author: "Zeina, Saadeddin; Jacques, Nyilinkindi",
  //   categoryName: "ABCD",
  //   categoryKey: "EEV72PK2",
  //   reportNumber: "12",
  //   date: "2021-01-19",
  //   primaryTeam: "EdTech Hub Team",
  //   documentURL: "http://localhost:5000/api/output/categories"
  // };

  // const request = saveNewOutput(requestData);
  // console.log(request);

  // console.log('><>>>>>>', allCategories);

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Create Record</h1>
          <p className="text-xs text-gray-500">
            New Zotero / Zenodo Record
          </p>
        </div>
        <form className="magnetic-form w-6/12">
          <div className="my-6">
            <InputLabel label="Title">
              <Input
                id="title"
                className="floating-input rounded-md"
                placeholder="Title"
              />
            </InputLabel>
          </div>
          <div className="my-6">
            <InputLabel label="Authors">
              <Input
                id="authors"
                className="floating-input rounded-md"
                placeholder="Last Name, First Name; Last Name, First Name"
              />
            </InputLabel>
          </div>
          <div className="my-6">
            <Select 
              className="floating-input rounded-md" defaultValue="0">
                <Option value="0">Select Category</Option>
            </Select>
          </div>
          <div className="my-6">
            <InputLabel label="Report number">
              <Input
                className="floating-input rounded-md"
                placeholder="Report number"
              />
            </InputLabel>
          </div>
          <div className="my-6">
            <InputLabel label="">
              <Input
                type="date"
                className="floating-input rounded-md"
                placeholder="Date"
              />
            </InputLabel>
          </div>
          <div className="my-6">
            <Select 
              className="floating-input rounded-md" defaultValue="0">
                <Option value="0">Select Primary Team</Option>
            </Select>
          </div>
          <div className="my-6">
            <InputLabel label="URL to working document (Google Drive)">
              <Input
                className="floating-input rounded-md"
                placeholder="https://docs.google.com/"
              />
            </InputLabel>
          </div>
          <CustomButton block size="medium" classes="text-lg" onClick={submitData}>
            Create Record
          </CustomButton>
        </form>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
