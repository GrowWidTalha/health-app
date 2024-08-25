import { createRequest } from "@/actions/request.actions";
import { createRequestSchema } from "@/lib/validation";
import { RequestStatusType, RequestUserType } from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next13-progressbar";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

const CreateRequestForm = ({
  usertype,
  userId,
  appointmentId,
  setOpen,
  username
}: {
  usertype: RequestUserType;
  userId: string;
  appointmentId: string;
  username: string
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createRequestSchema>>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createRequestSchema>) => {
    setIsLoading(true);
    try {

      const requestData = await createRequest({
        appointment: appointmentId,
        usertype: usertype,
        requestedBy: userId,
        reason: values.reason,
        status: "pending",
        username: username,
      });
      if (requestData) {
        setOpen(false);
      }
    } catch (error) {
      console.log("error submiting form: ", error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField
          name="reason"
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          label="Reason of resheduling"
          placeholder="TIming conflict"
        />

        <SubmitButton isLoading={isLoading}>Request</SubmitButton>
      </form>
    </Form>
  );
};

export default CreateRequestForm;
