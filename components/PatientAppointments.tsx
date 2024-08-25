"use client"
import React, { useMemo, useState } from 'react';
import { Appointment } from "@/types/appwrite.types";
import AppointmentCard from "@/components/cards/AppointmentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientAppointmentsProps {
  appointments: Appointment[];
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = ({ appointments }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('upcoming');

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const appDate = new Date(app.schedule);
      const passesStatusFilter = statusFilter === 'all' || app.status === statusFilter;
      let passesTimeFilter = true;

      switch (timeFilter) {
        case 'today':
          passesTimeFilter = appDate >= today && appDate < tomorrow;
          break;
        case 'upcoming':
          passesTimeFilter = appDate >= tomorrow && appDate < oneWeekLater;
          break;
        case 'recent':
          passesTimeFilter = appDate >= oneWeekAgo && appDate < today;
          break;
        case 'all':
        default:
          passesTimeFilter = true;
      }

      return passesStatusFilter && passesTimeFilter;
    });
  }, [appointments, statusFilter, timeFilter]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end gap-4 mb-4">
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setTimeFilter(value)} defaultValue="upcoming">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="upcoming">Next 7 Days</SelectItem>
            <SelectItem value="recent">Last 7 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.$id}
              appointmentId={appointment.$id}
              doctor={appointment.doctor!}
              schedule={appointment.schedule}
              status={appointment.status}
              location={appointment.type}
            />
          ))
        ) : (
          <p>No appointments found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
