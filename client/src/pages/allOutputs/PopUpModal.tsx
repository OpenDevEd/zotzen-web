/* eslint-disable react/jsx-indent */
import React, {
  useState, useRef,
} from 'react';
import {
  Modal, Spin,
} from 'antd';
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
  const {
    outPutId, isVisible, handleCancel,
  } = props;

  const precheck = (data: any): void => {
    let dataCheck = checkboxData.map((parent) => ({
      name: parent.name,
      isChecked: false,
      children: parent?.children?.map((child) => ({
        ...child,
        isChecked: false,
      })),
    }));

    if (data) {
      const tags = checkboxData.map((parent) => {
        const arr = [];
        arr.push(parent.name);
        if (parent?.children) {
          parent.children.map((child) => arr.push(child.name));
        }
        return arr;
      });

      const tagsToSelect = Array
        .prototype
        .concat(...tags)
        .filter((tag) => data.tags.indexOf(tag) !== -1);

      if (tagsToSelect.length === 0) {
        data?.tags.map((tag: string) => {
          dataCheck = [...dataCheck, { name: tag, isChecked: true, children: [] }];
          return dataCheck;
        });
      }

      dataCheck.map((parent, idx) => {
        tagsToSelect.map((t) => {
          if (t === parent.name) {
            const item = [...dataCheck];
            item[idx].isChecked = true;
            submitData.push(t);
            return item;
          }

          if (t !== parent.name) {
            let item = [...dataCheck];
            submitData.push(t);
            item = [...item, { name: t, isChecked: true, children: [] }];

            return item;
          }
          return t;
        });

        if (parent.children) {
          parent.children.map((child, idxx) => {
            tagsToSelect.map((t) => {
              if (t === child.name) {
                const item = [...dataCheck];
                item[idx].children[idxx].isChecked = true;
                submitData.push(t);
                return item;
              }
              return t;
            });
            return child;
          });
        }
        return parent;
      });
    }

    setSelectedData(dataCheck);
  };

  const {
    isLoading,
  } = useQuery<any>(
    'tags',
    () => Requests.getTags(outPutId),
    {
      enabled: isVisible && !!outPutId,
      onSuccess: (data) => precheck(data),
    },
  );

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
    const { name } = e.target;

    const checkedItems = selectedData.map((parent, index) => {
      if (parent.children) {
        return parent.children.map((child: Record<string, any>, idx: number) => {
          if (child.name === e.target.id && e.target.checked === true) {
            const updatedList = [...selectedData];
            updatedList[index].children[idx].isChecked = !updatedList[index].children[idx];
            updatedList[index].isChecked = !updatedList[index].isChecked;
            if (!submitData.includes(parent.name)) {
              submitData.push(parent.name);
            }
            submitData.push(child.name);
            inputEl.current[parent.name].checked = true;
            return child;
          }
          if (child.name === e.target.id && e.target.checked === false) {
            const filteredData = submitData.filter((item: any) => item !== name);
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
    const { name } = e.target;
    const checkedItems = selectedData.map((parent, idx) => {
      const updatedList = [...selectedData];
      updatedList[idx].isChecked = !updatedList[idx].isChecked;
      if (parent.name === e.target.id && e.target.checked === true) {
        if (!submitData.includes(parent.name)) {
          submitData.push(parent.name);
        }
        return parent;
      }
      if (parent.name === e.target.id && e.target.checked === false) {
        const filteredData = submitData.filter((item) => item.name !== name);
        setSubmitData(filteredData);
        return parent;
      }
      return parent;
    });
    setSelectedData(checkedItems);
  };

  return (
    <Modal
      title="Tags"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={handleClose}
      cancelText="Close"
      okText="Submit"
      closable={false}
      maskClosable={false}
      destroyOnClose
    >
      {!isLoading && selectedData.length > 0 ? (
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
                defaultChecked={parent.isChecked}
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
                      defaultChecked={child.isChecked}
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
