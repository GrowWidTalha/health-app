import {Stripe} from 'stripe'
import { NextResponse } from 'next/server'
import {  updatePaymentStatus } from '@/actions/appointment.actions'

export async function POST(request: Request) {
  const body = await request.text()
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { metadata } = event.data.object

   const appointment = await updatePaymentStatus(metadata?.appointmentId!)
    console.log(appointment)
    // const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', appointment: appointment })
  }

  return new Response('', { status: 200 })
}
