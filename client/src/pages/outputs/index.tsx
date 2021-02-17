import React, { useEffect, useState } from "react"
import { message } from "antd"
import DataTable from "react-data-table-component"
import UserLayout from "../../components/Layout/UserLayout"
import { axios } from "../../services"

interface UnknownObject {
  [key: string]: any
}

const Outputs = () => {
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState<UnknownObject[]>([])
  const fetchData = async () => {
    try {
      const { data }: UnknownObject = await axios.get("/output")
      setOptions(data)
    } catch (err) {
      message.error(err.message || err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "DOI",
      selector: "doi",
    },
    {
      name: "Link",
      selector: "linkToLibrary",
      cell: (row: any) => (
        <a target="_blank" rel="noreferrer" href={row.linkToLibrary}>
          {row.linkToLibrary}
        </a>
      ),
    },
  ]

  return (
    <UserLayout>
      <div>
        <div>
          <h1 className="uppercase font-thin">Created Outputs</h1>
          <p className="text-xs text-gray-500">List of My Outputs</p>
        </div>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={options} pagination={true} />
      </div>
    </UserLayout>
  )
}

export default Outputs
