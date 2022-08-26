/* eslint-disable react/jsx-indent */
import React, {
  useState, useRef, useEffect,
} from 'react';
import {
  Modal, Spin, message,
} from 'antd';
import { useMutation, useQuery } from 'react-query';
import checkboxData from '../../utils/example.facets-tag.config.json';
import Requests from '../../services/requests';

interface Props {
  [key: string]: any

}

const PopUpModal: React.FC<Props> = (props) => {
  const [submitData, setSubmitData] = useState<Set<string>>(new Set());
  const [tagsRemove, setTagsRemove] = useState<Set<string>>(new Set());
  const [selectedData, setSelectedData] = useState<Record<string, any>[]>([]);
  const [msg, setMsg] = useState<string>('');
  const inputEl = useRef<any>([]);
  const {
    outPutId, isVisible, handleCancel,
  } = props;

  const precheck = (data: any): void => {
    let dataCheck = checkboxData.map((parent) => ({
      name: parent.name,
      id: parent.id,
      isChecked: false,
      children: parent?.children?.map((child) => ({
        ...child,
        isChecked: false,
      })),
    }));

    if (data) {
      const tags = checkboxData.map((parent) => {
        const arr = [];
        arr.push(parent.id);
        if (parent?.children) {
          parent.children.map((child) => arr.push(child.id));
        }
        return arr;
      });

      const tagsToSelect = Array
        .prototype
        .concat(...tags)
        .filter((tag) => data.tags.indexOf(tag) !== -1);

      if (tagsToSelect.length === 0) {
        data?.tags.map((tag: string) => {
          dataCheck = [...dataCheck, {
            name: '', id: tag, isChecked: true, children: [],
          }];
          return dataCheck;
        });
      }

      dataCheck.map((parent, idx) => {
        tagsToSelect.map((t) => {
          if (t === parent.id) {
            const item = [...dataCheck];
            item[idx].isChecked = true;
            return item;
          }

          if (t !== parent.id) {
            let item = [...dataCheck];
            item = [...item, {
              name: '', id: t, isChecked: true, children: [],
            }];

            return item;
          }
          return t;
        });

        if (parent.children) {
          parent.children.map((child, idxx) => {
            tagsToSelect.map((t) => {
              if (t === child.id) {
                const item = [...dataCheck];
                item[idx].children[idxx].isChecked = true;
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

  const handleClose = (): void => {
    setSelectedData([]);
    submitData?.clear();
    tagsRemove.clear();
    handleCancel();
  };

  const {
    mutate,
    isLoading: isMutating,
  } = useMutation(
    (tags: string[]) => Requests.addTags(outPutId, tags),
    {
      onSuccess: () => {
        handleClose();
        setMsg('The tags were updated.');
      },
    },
  );

  const {
    mutate: remove,
    isLoading: isRemoving,
  } = useMutation((tags: string[]) => Requests.removeTags(outPutId, tags), {
    onSuccess: () => {
      handleClose();
      setMsg('The tags were updated.');
    },
  });

  useEffect(() => {
    if (msg.length > 0) message.success(msg);
    return () => setMsg('');
  });

  const handleOk = (): void => {
    if (submitData.size > 0) mutate([...new Set(submitData)]);
    if (tagsRemove.size > 0) remove([...new Set(tagsRemove)]);
    if (submitData.size === 0 && tagsRemove.size === 0) message.warn('No changes were made.');
  };

  const checkChildBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checkedItems = selectedData.map((parent) => {
      if (parent.children) {
        return parent.children.map((child: Record<string, any>) => {
          if (child.id === e.target.id && e.target.checked) {
            if (!submitData.has(parent.id)) {
              setSubmitData((prev) => new Set(prev.add(parent.id)));
              setTagsRemove((prev) => new Set([...prev].filter((x) => x !== parent.id)));
            }
            setSubmitData((prev) => new Set(prev.add(child.id)));
            setTagsRemove((prev) => new Set([...prev].filter((x) => x !== child.id)));

            inputEl.current[parent.id].checked = true;
            return child;
          }
          if (child.id === e.target.id && !e.target.checked) {
            setSubmitData((prev) => new Set([...prev].filter((x) => x !== child.id)));
            setTagsRemove((prev) => new Set(prev.add(child.id)));

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
    const checkedItems = selectedData.map((parent) => {
      if (parent.id === e.target.id && e.target.checked) {
        if (!submitData.has(parent.id)) {
          setSubmitData((prev) => new Set(prev.add(parent.id)));
          setTagsRemove((prev) => new Set([...prev].filter((x) => x !== parent.id)));
        }
        return parent;
      }
      if (parent.id === e.target.id && !e.target.checked) {
        setTagsRemove((prev) => new Set(prev.add(parent.id)));
        setSubmitData((prev) => new Set([...prev].filter((x) => x !== parent.id)));
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
      okText={isMutating || isRemoving ? 'Submitting...' : 'Submit'}
      closable={false}
      maskClosable={false}
      destroyOnClose
    >
      {!isLoading && selectedData.length > 0 ? (
        selectedData.map((parent) => (
          <div
            key={parent.id + 1}
            style={{ display: (parent.name === '') ? 'none' : 'block' }}
          >
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
                defaultChecked={parent.isChecked}
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
