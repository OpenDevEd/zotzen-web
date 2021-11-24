import React, { useEffect, useState, useRef } from "react"
import { Modal, Spin } from "antd"

interface UnknownObject {
  [key: string]: any
}

const PopUpModal = (props: any) => {
  console.log(props.outPutId)

  const [submitData, setSubmitData] = useState<UnknownObject[]>([])
  const [selectedData, setSelectedData] = useState<UnknownObject[]>([])
  const inputEl = useRef<any>([])
  const { outPutId, isVisible, handleCancel, refreshModal } = props
  console.log(outPutId, selectedData)

  useEffect(() => {
    fetch("https://erick-mulindi-chat-server.glitch.me/messages")
      .then((data) => data.json())
      .then((data) => {
        setSelectedData(data)
      })
      .catch((error) => console.log(error))
  }, [refreshModal])
  const handleOk = () => {
    setSelectedData([])
    setSubmitData([])
    handleCancel()
    console.log(submitData)
  }
  const handleClose = () => {
    setSelectedData([])
    setSubmitData([])
    handleCancel()
  }

  const checkChildBox = (e: any) => {
    let childId = e.target.id
    let checkedItems = selectedData.map((parent) => {
      return parent.children.map((child: any) => {
        if (child.id === childId && e.target.checked === true) {
          if (!submitData.includes(parent.id)) {
            submitData.push(parent.id)
          }
          submitData.push(child.id)
          inputEl.current[parent.id].checked = true
          return child
        }
        if (child.id === childId && e.target.checked === false) {
          let filteredData = submitData.filter((item) => item !== e.target.id)
          setSubmitData(filteredData)
          return child
        } else {
          return child
        }
      })
    })
    selectedData.forEach((parent, index) => {
      parent["children"] = checkedItems[index]
    })
    setSelectedData(selectedData)
  }

  const checkParentBox = (e: any) => {
    let checkedItems = selectedData.map((parent) => {
      if (parent.id === e.target.id && e.target.checked === true) {
        if (!submitData.includes(parent.id)) {
          submitData.push(parent.id)
        }
        return parent
      }
      if (parent.id === e.target.id && e.target.checked === false) {
        let filteredData = submitData.filter((item) => item !== e.target.id)
        setSubmitData(filteredData)
        return parent
      } else {
        return parent
      }
    })
    setSelectedData(checkedItems)
  }

  return (
    <Modal
      title="Check Boxes"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleClose}
    >
      {selectedData.length !== 0 ? (
        selectedData.map((parent) => {
          return (
            <div key={parent.id + 1}>
              <label key={parent.id + 2}>
                <input
                  style={{
                    filter: "hue-rotate(150deg)",
                    transform: "scale(1.3)",
                    margin: "8px",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  ref={(el) => (inputEl.current[parent.id] = el)}
                  onChange={(e) => checkParentBox(e)}
                  id={parent.id}
                  type="checkbox"
                />
                {parent.name}
              </label>
              <div>
                {parent.children ? (
                  parent.children.map((child: any) => {
                    return (
                      <label key={child.id + 1}>
                        <input
                          style={{
                            filter: "hue-rotate(150deg)",
                            transform: "scale(1.3)",
                            margin: "10px",
                            appearance: "checkbox",
                          }}
                          onChange={(e) => checkChildBox(e)}
                          id={child.id}
                          type="checkbox"
                        />
                        {child.name}
                      </label>
                    )
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          )
        })
      ) : (
        <div style={{ textAlign: "center" }}>
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      )}
    </Modal>
  )
}

export default PopUpModal
