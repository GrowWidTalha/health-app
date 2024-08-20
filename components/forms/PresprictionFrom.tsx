"use client";

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { uploadPrescription} from "@/actions/prescription.actions";
import { Appointment } from "@/types/appwrite.types";
import { PrescriptionFormValues } from "@/types";

// Define the validation schema using Zod
const prescriptionSchema = z.object({
  prescriptions: z.array(
    z.object({
      name: z.string().nonempty("Medication name is required"),
      dosage: z.string().nonempty("Dosage is required"),
      quantity: z.string().nonempty("Quantity is required"),
    })
  ),
});

// Define the form values type based on the schema

export default function PrescriptionForm({ appointment }: { appointment: Appointment}) {
  const { control, handleSubmit } = useForm<PrescriptionFormValues>({
    defaultValues: {
      prescriptions: [{ name: "", dosage: "", quantity: "" }],
    },
    resolver: zodResolver(prescriptionSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescriptions",
  });

  const onSubmit =async (data: PrescriptionFormValues) => {
    console.log("Submitted data:", data);
    const prespriction = await uploadPrescription(appointment, data )
        console.log(prespriction)
  };

  return (
    <Card className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Prescription Items</CardTitle>
          <CardDescription>Add the details of your prescription items below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Medication Name</Label>
                  <Controller
                    name={`prescriptions.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <Input
                      className="shad-input"
                        id={`name-${index}`}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                  <Controller
                    name={`prescriptions.${index}.dosage`}
                    control={control}
                    render={({ field }) => (
                      <Input
                      className="shad-input"
                        id={`dosage-${index}`}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Controller
                    name={`prescriptions.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <Input
                      className="shad-input"

                        id={`quantity-${index}`}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => remove(index)}
                className="justify-self-end"
              >
                Remove
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button type="button" className="flex gap-2 bg-green-500" onClick={() => append({ name: "", dosage: "", quantity: "" })}>
            <Plus className="size-4"/>
            Add Prescription
          </Button>
          <Button type="submit" className="flex gap-2 bg-green-500">
            Send
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
