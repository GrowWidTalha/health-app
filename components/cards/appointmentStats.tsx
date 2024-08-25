
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Appointment } from '@/types/appointment'

interface AppointmentStatsProps {
  appointments: Appointment[]
}

export function AppointmentStats({ appointments }: AppointmentStatsProps) {
  const totalCreated = appointments.length
  const scheduled = appointments.filter(app => app.status === 'scheduled').length
  const completed = appointments.filter(app => app.status === 'completed').length
  const online = appointments.filter(app => app.type === 'online').length

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="p-4">
          <CardDescription>Total Created</CardDescription>
          <CardTitle>{totalCreated}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardDescription>Scheduled</CardDescription>
          <CardTitle>{scheduled}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardDescription>Completed</CardDescription>
          <CardTitle>{completed}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <CardDescription>Online</CardDescription>
          <CardTitle>{online}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
