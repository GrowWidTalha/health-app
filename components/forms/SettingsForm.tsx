"use client";
import { settingsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Settings } from "@/types/appwrite.types";
import { getCachedSetting, updateSettings } from "@/actions/settings.actions";
import Loader from "@/app/loading";

const SettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      hospitalName: "",
      email: "",
      phone: "",
      address: "",
      onlineAppointment: true,
      onlineAppointmentFees: "0",
      slogan: ""
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchedSettings: any = await getCachedSetting();
      setSettings(fetchedSettings);

      // Reset the form values with the fetched data
      form.reset({
        hospitalName: fetchedSettings?.hospitalName || "",
        email: fetchedSettings?.email || "",
        phone: fetchedSettings?.phone || "",
        address: fetchedSettings?.address || "",
        onlineAppointment: fetchedSettings?.onlineAppointment ?? true,
        onlineAppointmentFees: fetchedSettings?.onlineAppointmentFees || 0,
        slogan: fetchedSettings.slogan || "",
      });
    };
    fetchSettings();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    setIsLoading(true);
    try {
      // Handle form submission
      const updatedSettings = {
        ...values,
        onlineAppointmentFees: values.onlineAppointment ? values.onlineAppointmentFees : 0,
      };
      await updateSettings(updatedSettings);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Watch the online appointment toggle and automatically set fees to zero if turned off
  const isOfferingOnlineAppointment = form.watch("onlineAppointment");

  useEffect(() => {
    if (!isOfferingOnlineAppointment) {
      form.setValue("onlineAppointmentFees", 0);
    }
  }, [isOfferingOnlineAppointment, form]);

  if (!settings) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <div className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hospitalName"
            label="Hospital Name"
            placeholder="Health Sync"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="slogan"
            label="Hospital Slogan"
            placeholder="Get healthy with us"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Hospital Email"
            placeholder="healthsync@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Hospital Phone number"
            placeholder="(555) 123-4567"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Hospital Address"
            placeholder="Main Street 2, New York"
          />

          <CustomFormField
            fieldType={FormFieldType.SWITCH}
            control={form.control}
            name="onlineAppointment"
            label="Online Appointments"
          />

          {/* Conditionally render the online appointment fees field */}
          {isOfferingOnlineAppointment && (
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="onlineAppointmentFees"
              label="Online Appointment Fees"
              placeholder="Enter fees"
              type="number"
            />
          )}
        </div>

        <SubmitButton isLoading={isLoading}>Update Settings</SubmitButton>
      </form>
    </Form>
  );
};

export default SettingsForm;
