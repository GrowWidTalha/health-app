"use client";
import { createDoctorSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FileUploader } from "../FileUploader";
import { createDoctor, deleteDoctor, updateDoctor } from "@/actions/doctors.actions";
import { Doctor } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

interface DoctorFormProps {
  doctor?: Doctor;
  type: "update" | "create" | "delete";
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const DoctorForm = ({ doctor, type, setOpen }: DoctorFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createDoctorSchema>>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      name: doctor ? doctor.name : "",
      email: doctor ? doctor.email : "",
      phone: doctor ? doctor.phone : "",
      areaOfExpertise: doctor ? doctor.areaOfExpertise : "",
      avatar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof createDoctorSchema>) => {
    setIsLoading(true);
    let formData;

    if (values.avatar && values.avatar?.length > 0) {
      const blobFile = new Blob([values.avatar[0]], {
        type: values.avatar[0]?.type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.avatar[0]?.name);
    }
    try {
      if (type === "create") {
        const doctor = {
          avatar: values.avatar ? formData : undefined,
          name: values.name,
          areaOfExpertise: values.areaOfExpertise,
          email: values.email,
          phone: values.phone,
        };

        const doctorData = await createDoctor(doctor);
        if(doctorData){
          form.reset();
         setOpen && setOpen(false)
        }
      } else if (type === "update") {
        const updateDoctordata = {
          ...values,
          avatar: values.avatar ? formData : doctor?.avatar,
        };

        const doc = await updateDoctor(doctor?.$id!, updateDoctordata);
        if (doc) {
          setOpen && setOpen(false)
        }
      } else if(type === "delete"){
        const doc = await deleteDoctor(doctor?.$id!)
        if(doc){
          setOpen && setOpen(false)
        }
      }
    } catch (error) {
      console.log("error while submiting doctor form: ", error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type !== "delete" ? (
          <div>

          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="areaOfExpertise"
          label="Area of Expertisse"
          placeholder="eg. Physcologist, Cardiologist"
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="avatar"
          label="Doctor avatar"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
          </div>
        ): (
          <p className="text-14-regular">
            Are you sure that you want to delete this doctor?
          </p>
        )}

        <SubmitButton className={`${type === "delete" ? "bg-red-500" :"bg-green-500"} w-full`} isLoading={isLoading}>{type} Doctor</SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorForm;
