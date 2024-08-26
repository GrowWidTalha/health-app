"use server"

import { CreateAppointmentParams } from "@/types"
import { Stripe} from "stripe"
import { Appointment } from "@/types/appwrite.types"
import { redirect } from "next/navigation"
import { createAppointment } from "./appointment.actions"
import { log } from "console"
import { getCachedSetting } from "./settings.actions"
export const checkoutOnlineAppointment = async (appointment: CreateAppointmentParams, price: number ) => {
    const hospitalData:any = await getCachedSetting()
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const appointmentData = await createAppointment(appointment)
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: hospitalData?.onlineAppointmentFees! * 100,
                    product_data: {
                        name: appointment.reason,
                    }
                },
                quantity: 1,
            }
          ],
          metadata: {
             appointmentId: appointmentData.$id
          },
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/patients/${appointmentData.userId}/new-appointment/success?appointmentId=${appointmentData.$id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/patients/${appointmentData.userId}/new-appointment?cancelled=true`,
        });
        log("in before redirect")

        // redirect(session.url!)
        return session.url
      } catch (err) {
        console.log(err)
      }
    }
