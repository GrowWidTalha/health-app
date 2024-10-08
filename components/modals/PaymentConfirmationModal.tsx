import { checkoutOnlineAppointment } from "@/actions/payment.actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { CreateAppointmentParams } from "@/types";
  import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next13-progressbar";

loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button } from "../ui/button";
interface PaymentCompleteModalProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    appointment: CreateAppointmentParams,
}

  const PaymentConfirmationModal = ({ open, setOpen, appointment}: PaymentCompleteModalProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
      const onCheckOut = async () => {
        setIsLoading(true)
    try {
        const url = await checkoutOnlineAppointment(appointment, 1000)
        if(url){
            router.push(url)
        }
    } catch (error) {
        console.log("Error while reidrecting to stripe",error)
    }
    setIsLoading(false)

      }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ve chosed online appointment. In online appointment you have to pay the appointment fees first.
              Click continue to pay using stripe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isLoading && <p>Wait while we redirect to stripe checkout page..</p>}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
             onClick={onCheckOut} disabled={isLoading}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    )
  }

  export default PaymentConfirmationModal
