import { Appointment } from "@/types/appwrite.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}


interface AppointmentCategories {
  recentAppointments: Appointment[];
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];
}

export function filterAppointments(appointments: Appointment[]): AppointmentCategories {
  const now = new Date();

  const recentAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.schedule);

    return (
      appointmentDate < now &&
      appointmentDate.toDateString() !== now.toDateString()
    );
  });

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.schedule);

    return (
      appointmentDate.toDateString() === now.toDateString() &&
      appointment.status === "scheduled"
    );
  });

  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.schedule);

    return (
      appointmentDate > now &&
      appointment.status === "scheduled"
    );
  });

  return {
    recentAppointments,
    todayAppointments,
    upcomingAppointments,
  };
}

/**
 * Calculates age based on the date of birth.
 * @param dob - Date of birth as a string (format: YYYY-MM-DD).
 * @returns The calculated age in years.
 */
export function calculateAge(dob: string | Date): string {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birth date this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${age}`;
  }

  interface ChartDataPoint {
    date: string
    count: number
  }
  export function prepareAppointmentChartData(appointments: Appointment[]): ChartDataPoint[] {
    const today = new Date()
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Create an array of the last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      return date.toISOString().split('T')[0]
    }).reverse()

    // Count appointments for each day
    const appointmentCounts = appointments.reduce((acc, appointment) => {
      const date = new Date(appointment.$createdAt).toISOString().split('T')[0]
      if (new Date(date) >= thirtyDaysAgo) {
        acc[date] = (acc[date] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // Create chart data with all 30 days, filling in zeros for days with no appointments
    const chartData: ChartDataPoint[] = last30Days.map(date => ({
      date,
      count: appointmentCounts[date] || 0
    }))

    return chartData
  }
