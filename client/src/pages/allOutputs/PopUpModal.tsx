/* eslint-disable react/jsx-indent */
import React, {
  useEffect, useState, useRef, EventHandler,
} from 'react';
import { Modal, Spin } from 'antd';
import { useMutation } from 'react-query';
import checkboxData from '../../utils/example.facets-tag.config.json';
import Requests from '../../services/requests';

interface Props {
  [key: string]: any

}

const PopUpModal: React.FC<Props> = (props) => {
  const [submitData, setSubmitData] = useState<Record<string, any>[]>([]);
  const [selectedData, setSelectedData] = useState<Record<string, any>[]>([]);
  const inputEl = useRef<any>([]);
  const {
    outPutId, isVisible, handleCancel, refreshModal,
  } = props;

  useEffect(() => {
    // fetch("https://erick-mulindi-chat-server.glitch.me/messages")
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setSelectedData(data)
    //   })
    //   .catch((error) => console.log(error))
    setSelectedData(checkboxData);
  }, [refreshModal]);

  const { mutate, isSuccess, data } = useMutation((tags: Record<string, any>[]) => Requests.addTags(outPutId, tags));

  const handleOk = (): void => {
    setSelectedData([]);
    setSubmitData([]);
    handleCancel();
    console.log(submitData, 'tags');
    mutate(submitData);
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

  return (
    <Modal
      title="Add tags"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleClose}
    >
      {selectedData.length !== 0 ? (
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
      ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin tip="Loading..." size="large" />
          </div>
      )}
    </Modal>
  );
};

export default PopUpModal;
