import { getAllRequests } from '@/actions/request.actions'
import { DataTable } from '@/components/table/DataTable'
import { requestsColumn } from '@/components/table/requestsColumn'
import React from 'react'

const reviewRequestsPage = async() => {
  const documents = await getAllRequests();
  return (
    <div className="px-6">
      <h1 className="mb-6 text-2xl font-bold">Appointment Reschedule Requests</h1>
      <div className='bg-dark-400 '>
      <DataTable 
        columns={requestsColumn}
        data={documents}
      />
      </div>
    </div>
  )
}

export default reviewRequestsPage