/* eslint-disable react/jsx-indent */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { Modal, Spin } from 'antd';
import { useMutation, useQuery } from 'react-query';
import checkboxData from '../../utils/example.facets-tag.config.json';
import Requests from '../../services/requests';

interface Props {
  [key: string]: any

}

const PopUpModal: React.FC<Props> = (props) => {
  const [submitData, setSubmitData] = useState<Record<string, any>[]>([]);
  const [selectedData, setSelectedData] = useState<Record<string, any>[]>([]);
  const inputEl = useRef<any>([]);
  const [checkedTags, setCheckedTags] = useState<Record<string, any>[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const {
    outPutId, isVisible, handleCancel, refreshModal,
  } = props;

  if (outPutId !== undefined) {
    setIsFetching(true);
  }

  const { data, isLoading, isSuccess } = useQuery<any>(
    'tags',
    () => Requests.getTags(outPutId),
    { onSuccess: () => setCheckedTags(data?.data), enabled: isFetching },
  );

  useEffect(() => {
    setSelectedData(checkboxData);
  }, []);

  // console.log(data, '==========');

  // selectedData = [...selectedData, data?.data];
  // }
  // }, [data, refreshModal]);

  // useEffect(() => {
  //   // fetch("https://erick-mulindi-chat-server.glitch.me/messages")
  //   //   .then((data) => data.json())
  //   //   .then((data) => {
  //   //     setSelectedData(data)
  //   //   })
  //   //   .catch((error) => console.log(error))
  //   setSelectedData(checkboxData);
  // }, [refreshModal]);

  const { mutate } = useMutation((tags: any) => Requests.addTags(outPutId, tags));

  const handleOk = (): void => {
    mutate({ tags: submitData });
    setSelectedData([]);
    setSubmitData([]);
    handleCancel();
  };
  const handleClose = (): void => {
    setSelectedData([]);
    setSubmitData([]);
    handleCancel();
  };

  const checkChildBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const childId = e.target.name;
    const checkedItems = selectedData.map((parent: Record<string, any>) => {
      if (parent.children) {
        return parent.children.map((child: Record<string, any>) => {
          if (child.name === childId && e.target.checked === true) {
            if (!submitData.includes(parent.name)) {
              submitData.push(parent.name);
            }
            submitData.push(child.name);
            inputEl.current[parent.name].checked = true;
            return child;
          }
          if (child.name === childId && e.target.checked === false) {
            const filteredData = submitData.filter((item: any) => item !== e.target.name);
            setSubmitData(filteredData);
            return child;
          }
          return child;
        });
      }
      return false;
    });
    selectedData.forEach((parent, index) => {
      // eslint-disable-next-line no-param-reassign
      parent.children = checkedItems[index];
    });
    // selectedData = [...selectedData, selectedData];
    setSelectedData(selectedData);
  };

  const checkParentBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    const checkedItems = selectedData.map((parent) => {
      if (parent.name === e.target.id && e.target.checked === true) {
        if (!submitData.includes(parent.name)) {
          submitData.push(parent.name);
        }
        return parent;
      }
      if (parent.name === e.target.name && e.target.checked === false) {
        const filteredData = submitData.filter((item) => item.name !== name);
        setSubmitData(filteredData);
        return parent;
      }
      return parent;
    });
    setSelectedData(checkedItems);
  };

  // https://api.zotero.org/groups/2259720/items/HKH5TDTT/tags
  // https://api.zotero.org/users/2259720/items/HKH5TDTT/tags

  // 9042012 user id me

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <Modal
      title="Add tags"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleClose}
    >
      {/* {data && data?.tags.map((tag: any) => (
        <label key={tag.tag}>
          <input
            style={{
              filter: 'hue-rotate(150deg)',
              transform: 'scale(1.3)',
              margin: '8px',
              outline: 'none',
              boxShadow: 'none',
            }}
            // eslint-disable-next-line no-return-assign
            ref={(el) => (inputEl.current[tag] = el)}
            // onChange={(e) => checkParentBox(e)}
            id={tag}
            type="checkbox"
            defaultChecked
          />
          <span className=" font-normal ml-1">{tag.tag}</span>
        </label>
      ))} */}
      {selectedData.length !== 0 && (
        selectedData.map((parent) => (
          <div key={parent.name + 1}>
            <label key={parent.name + 2}>
              <input
                style={{
                  filter: 'hue-rotate(150deg)',
                  transform: 'scale(1.3)',
                  margin: '8px',
                  outline: 'none',
                  boxShadow: 'none',
                }}
                // eslint-disable-next-line no-return-assign
                ref={(el) => (inputEl.current[parent.name] = el)}
                onChange={(e) => checkParentBox(e)}
                id={parent.name}
                type="checkbox"
              />
              <span className=" font-semibold">{parent.name}</span>
            </label>
            <div className="flex flex-col ml-5">
              {parent.children && (
                parent.children.map((child: any) => (
                  <label key={child.name + 1}>
                    <input
                      style={{
                        filter: 'hue-rotate(150deg)',
                        transform: 'scale(1.3)',
                        margin: '10px',
                        appearance: 'checkbox',
                      }}
                      onChange={(e) => checkChildBox(e)}
                      id={child.name}
                      type="checkbox"
                    />
                    {child.name}
                  </label>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </Modal>
  );
};

export default PopUpModal;
