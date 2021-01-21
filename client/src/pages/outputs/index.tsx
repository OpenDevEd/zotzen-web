import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import UserLayout from '../../components/Layout/UserLayout';
import { axios } from "../../services"

interface UnknownObject {
  [key:string]: any
}

const  Outputs = () => {
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState<UnknownObject[]>([])
  const fetchData = async () => {
    try{
      const {data}: UnknownObject  = await axios.get('/output')
      setOptions(data)
    } catch(err) {
     message.error(err.message || err)
    } finally{
      setLoading(false)
    }
  }
  useEffect(() =>{
    fetchData()
  },[])

  console.log('>>>>>>>>>>>>>>>>>', options);

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Created Outputs</h1>
          <p className="text-xs text-gray-500">
            List of My Outputs
          </p>
        </div>
      </div>
      <div className="mt-6">
      <table className="table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-800 text-gray-300 border-2">
            <th className="px-16 py-2">Title</th>
            <th className="px-16 py-2">DOI</th>
            <th className="px-16 py-2">Link to Library</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {
          options.map(item => 
          <tr key={item._id} className="bg-white border-2 border-gray-200">
            <td className="font-semibold"> {item.title} </td>
            <td className="px-16 py-2"> {item.doi} </td>
            <td className="px-16 py-2 text-sm"> <a href={item.linkToLibrary} target="_blank" rel="noreferrer">{item.linkToLibrary}</a> </td>
          </tr>
          )
          }
        </tbody>
      </table>
    </div>
    </UserLayout>
  );
};

export default Outputs;
