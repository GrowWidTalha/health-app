import { Appointment } from "@/types/appwrite.types"
import { formatDateTime } from "./utils"

export function AppointmentEmailTemplate({type, appointment}: {type: "request"  | "confirm", appointment: Appointment}) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            max-width: 28rem;
            margin: auto;
        }
        .icon-circle-check {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .icon-circle-check i {
            font-size: 3rem;
            color: #10b981;
        }
        h2 {
            font-size: 1.75rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }
        p {
            color: #4b5563;
            margin-bottom: 1.5rem;
        }
        .info-box {
            background-color: #f3f4f6;
            border-radius: 0.375rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
        }
        .info-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .info-item:last-child {
            margin-bottom: 0;
        }
        .info-item i {
            color: #6b7280;
            margin-right: 0.5rem;
        }
        .info-item p {
            margin: 0;
            font-weight: 500;
            color: #374151;
        }
        .button-group {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        .button-group a {
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-size: 1rem;
            text-align: center;
            cursor: pointer;
            color: white;
            background-color: #10b981;
            border: none;
        }
        .button-outline {
            background-color: transparent;
            color: #10b981;
            border: 1px solid #10b981;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon-circle-check">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2>Appointment ${type === "request" ? "Request Submitted" : "Scheduled"}</h2>
        <p>
            Thank you for submitting your appointment request. ${type === "request" ? "We will be in touch with you soon to confirm the details." : "We are glad to tell you that your appointment has been scheduled successfully."}
        </p>
        <div class="info-box">
            <div class="info-item">
                <i class="fas fa-calendar"></i>
                <p>Date: ${formatDateTime(appointment.schedule).dateOnly} at ${formatDateTime(appointment.schedule).timeOnly}</p>
            </div>
            <div class="info-item">
                <i class="fas fa-user-md"></i>
                <p>Dr. ${appointment.doctor.name}, ${appointment.doctor.areaOfExpertise}</p>
            </div>
        </div>
        <p>
            We appreciate your patience as we ${type === "confirm" ? "were working" : "work"} to confirm your appointment. If you have any questions or need to make
            any changes, please don't hesitate to contact us.
        </p>
        <div class="button-group">
            <a href="#">
                <button class="button">Contact Us</button>
            </a>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/${appointment.$id}">
                <button class="button button-outline">View Appointment</button>
            </a>
        </div>
    </div>
</body>
</html>
`
}


export function generateCancellationEmail(appointment: Appointment) {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 0; margin: 0; }
            .container { background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 40px auto; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 24px; color: #e53e3e; }
            p { color: #4b5563; margin-bottom: 20px; }
            .info-box { background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
            .info-item { display: flex; align-items: center; margin-bottom: 10px; }
            .info-item:last-child { margin-bottom: 0; }
            .info-item i { color: #6b7280; margin-right: 8px; }
            .info-item p { margin: 0; font-weight: 500; color: #374151; }
                      .button { display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 16px; color: #fff; background-color: #e53e3e; text-decoration: none; }

          </style>
        </head>
        <body>
          <div class="container">
            <h1>Appointment Cancelled</h1>
            <p>
              We regret to inform you that your appointment scheduled for ${formatDateTime(appointment.schedule).dateOnly} at ${formatDateTime(appointment.schedule).timeOnly} with Dr. ${appointment.doctor.name}, ${appointment.doctor.areaOfExpertise} has been cancelled.
            </p>
            <div class="info-box">
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <p>Date: ${formatDateTime(appointment.schedule).dateOnly} at ${formatDateTime(appointment.schedule).timeOnly}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-user-md"></i>
                <p>Dr. ${appointment.doctor.name}, ${appointment.doctor.areaOfExpertise}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-info-circle"></i>
                <p>Reason: ${appointment.cancellationReason}</p>
              </div>
            </div>
            <p>
              If you have any questions or need further assistance, please don't hesitate to contact us.
            </p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/${appointment.$id}" class="button">View Appointments</a>
          </div>
        </body>
      </html>
    `;
  }


  export function generateDoctorNotificationEmail(appointment: Appointment) {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 0; margin: 0; }
            .container { background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 40px auto; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 24px; color: #10b981; }
            p { color: #4b5563; margin-bottom: 20px; }
            .info-box { background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
            .info-item { display: flex; align-items: center; margin-bottom: 10px; }
            .info-item:last-child { margin-bottom: 0; }
            .info-item i { color: #6b7280; margin-right: 8px; }
            .info-item p { margin: 0; font-weight: 500; color: #374151; }
            .button { display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 16px; color: #FFFFFF; background-color: #10b981; text-decoration: none; border: 2px solid #10b981; transition: background-color 0.3s ease, color 0.3s ease; }
            .button:hover { background-color: #FFFFFF; color: #10b981; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Appointment Scheduled</h1>
            <p>
              Dear Dr. ${appointment.doctor.name}, an appointment has been scheduled with the following details:
            </p>
            <div class="info-box">
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <p>Date: ${formatDateTime(appointment.schedule).dateOnly} at ${formatDateTime(appointment.schedule).timeOnly}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-user"></i>
                <p>Patient: ${appointment.patient.name}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <p>Email: ${appointment.patient.email}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>Phone: ${appointment.patient.phone}</p>
              </div>
            </div>
            <p>
              Please be prepared for the scheduled appointment. If you have any questions or need to reschedule, please contact the patient directly or use the system tools provided.
            </p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/${appointment.$id}" class="button">View Appointment</a>
          </div>
        </body>
      </html>
    `;
  }

  export function generateDoctorCancellationEmail(appointment: Appointment) {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 0; margin: 0; }
            .container { background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 40px auto; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 24px; color: #e53e3e; }
            p { color: #4b5563; margin-bottom: 20px; }
            .info-box { background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
            .info-item { display: flex; align-items: center; margin-bottom: 10px; }
            .info-item:last-child { margin-bottom: 0; }
            .info-item i { color: #6b7280; margin-right: 8px; }
            .info-item p { margin: 0; font-weight: 500; color: #374151; }
            .button { display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 16px; color: #FFFFFF; background-color: #e53e3e; text-decoration: none; border: 2px solid #e53e3e; transition: background-color 0.3s ease, color 0.3s ease; }
            .button:hover { background-color: #FFFFFF; color: #e53e3e; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Appointment Cancelled</h1>
            <p>
              Dear Dr. ${appointment.doctor.name}, the following appointment has been cancelled:
            </p>
            <div class="info-box">
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <p>Date: ${formatDateTime(appointment.schedule).dateOnly} at ${formatDateTime(appointment.schedule).timeOnly}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-user"></i>
                <p>Patient: ${appointment.patient.name}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-info-circle"></i>
                <p>Reason: ${appointment.cancellationReason}</p>
              </div>
            </div>
            <p>
              We apologize for any inconvenience this may have caused. If you have any questions or need further assistance, please feel free to reach out.
            </p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/${appointment.$id}" class="button">View All Appointments</a>
          </div>
        </body>
      </html>
    `;
  }



export function generatePrescriptionEmail(appointment: Appointment, prescriptionLink: string): string {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 0; margin: 0; }
            .container { background-color: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 40px auto; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 24px; color: #10b981; }
            p { color: #4b5563; margin-bottom: 20px; }
            .info-box { background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
            .info-item { display: flex; align-items: center; margin-bottom: 10px; }
            .info-item:last-child { margin-bottom: 0; }
            .info-item i { color: #6b7280; margin-right: 8px; }
            .info-item p { margin: 0; font-weight: 500; color: #374151; }
            .button { display: inline-block; padding: 10px 20px; border-radius: 4px; font-size: 16px; color: #FFFFFF; background-color: #10b981; text-decoration: none; border: 2px solid #10b981; transition: background-color 0.3s ease, color 0.3s ease; }
            .button:hover { background-color: #FFFFFF; color: #10b981; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Prescription Available</h1>
            <p>
              Dear ${appointment.patient.name}, your prescription from Dr. ${appointment.doctor.name} (${appointment.doctor.areaOfExpertise}) is now available.
            </p>
            <p>
              Please click the link below to download your prescription:
            </p>
            <a href="${prescriptionLink}" class="button">Download Prescription</a>
            <p>
              If you have any questions or need further assistance, feel free to contact us.
            </p>
          </div>
        </body>
      </html>
    `;
  }
