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
  const {
    outPutId, isVisible, handleCancel, refreshModal,
  } = props;

  const { data, isLoading, isSuccess } = useQuery<any>(
    'tags',
    () => Requests.getTags(outPutId),
    { onSuccess: () => setCheckedTags(data?.data) },
  );

  useEffect(() => {
    setSelectedData(checkboxData);
  }, [refreshModal]);

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
    const childId = e.target.id;
    const checkedItems = selectedData.map((parent: Record<string, any>) => {
      if (parent.children) {
        return parent.children.map((child: Record<string, any>) => {
          if (child.id === childId && e.target.checked === true) {
            if (!submitData.includes(parent.name)) {
              submitData.push(parent.name);
            }
            submitData.push(child.name);
            inputEl.current[parent.id].checked = true;
            return child;
          }
          if (child.id === childId && e.target.checked === false) {
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
    const { id } = e.target;
    const checkedItems = selectedData.map((parent) => {
      if (parent.id === e.target.id && e.target.checked === true) {
        if (!submitData.includes(parent.id)) {
          submitData.push(parent.name);
        }
        return parent;
      }
      if (parent.id === e.target.id && e.target.checked === false) {
        const filteredData = submitData.filter((item) => item.id !== id);
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
      {selectedData.length !== 0 && (
        selectedData.map((parent) => (
          <div key={parent.id + 1}>
            <label key={parent.id + 2}>
              <input
                style={{
                  filter: 'hue-rotate(150deg)',
                  transform: 'scale(1.3)',
                  margin: '8px',
                  outline: 'none',
                  boxShadow: 'none',
                }}
                // eslint-disable-next-line no-return-assign
                ref={(el) => (inputEl.current[parent.id] = el)}
                onChange={(e) => checkParentBox(e)}
                id={parent.id}
                type="checkbox"
              />
              <span className=" font-semibold">{parent.name}</span>
            </label>
            <div className="flex flex-col ml-5">
              {parent.children && (
                parent.children.map((child: any) => (
                  <label key={child.id + 1}>
                    <input
                      style={{
                        filter: 'hue-rotate(150deg)',
                        transform: 'scale(1.3)',
                        margin: '10px',
                        appearance: 'checkbox',
                      }}
                      onChange={(e) => checkChildBox(e)}
                      id={child.id}
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
