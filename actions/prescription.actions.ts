"use server"

import { PDFDocument, rgb } from 'pdf-lib';
import * as fs from 'fs';
import path from 'path';
import { readFile, unlink, mkdir } from 'fs/promises';
import { storage } from '@/lib/appwrite.config';
import { ID } from 'appwrite';
import { calculateAge, parseStringify } from '@/lib/utils';
import { Appointment, Settings } from '@/types/appwrite.types';
import { Buffer } from 'node:buffer';
import { PrescriptionData, PrescriptionFormValues } from "@/types";
import { InputFile } from 'node-appwrite';
import { addPresprictionUrlToDb } from './appointment.actions';
import { revalidatePath } from 'next/cache';
import { getCachedSetting } from './settings.actions';

// Create a directory if it doesn't exist
const ensureDir = async (dirPath: string) => {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(`Failed to create directory ${dirPath}:`, err);
    throw err;
  }
};

// Replace spaces in file name with hyphens
const sanitizeFileName = (fileName: string) => fileName.replace(/\s+/g, '-');

async function generatePrescriptionPDF({
  hospitalName,
  hospitalSlogan,
  doctorName,
  doctorSpecialty,
  primaryColor,
  patientName,
  patientAge,
  patientSex,
  date,
  prescriptionItems,
  hospitalAddress,
  hospitalPhone,
  hospitalEmail,
  outputPath
}: PrescriptionData) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([600, 842]);
  const { width, height } = page.getSize();

  const primaryColorRGB = rgb(
    parseInt(primaryColor.slice(1, 3), 16) / 255,
    parseInt(primaryColor.slice(3, 5), 16) / 255,
    parseInt(primaryColor.slice(5, 7), 16) / 255
  );

  page.drawText(hospitalName, { x: 50, y: height - 50, size: 20, color: primaryColorRGB });
  page.drawText(hospitalSlogan, { x: 50, y: height - 75, size: 12, color: rgb(0, 0, 0) });

  page.drawText(`Dr. ${doctorName}`, { x: 50, y: height - 100, size: 14 });
  page.drawText(doctorSpecialty, { x: 50, y: height - 120, size: 12 });

  page.drawText(`Name: ${patientName}`, { x: 50, y: height - 170, size: 12 });
  page.drawText(`Age: ${patientAge}`, { x: 250, y: height - 170, size: 12 });
  page.drawText(`Sex: ${patientSex}`, { x: 350, y: height - 170, size: 12 });
  page.drawText(`Date: ${date}`, { x: 450, y: height - 170, size: 12 });

  page.drawText('Rx', { x: 50, y: height - 220, size: 24 });

  let yPosition = height - 250;
  prescriptionItems.prescriptions.forEach((item: any, index: number) => {
    page.drawText(`${index + 1}. ${item.name}      Dosage: ${item.dosage}      Quantity: ${item.quantity}`, {
      x: 70,
      y: yPosition,
      size: 12,
    });
    yPosition -= 20;
  });

  const waveHeight = 60;
  const waveColor = primaryColorRGB;

  page.drawRectangle({ x: 0, y: 0, width, height: waveHeight, color: waveColor });
  page.drawRectangle({ x: 0, y: waveHeight, width, height: waveHeight, color: waveColor });

  page.drawText(hospitalAddress, { x: 50, y: waveHeight - 20, size: 10, color: rgb(1, 1, 1) });
  page.drawText(`Phone: ${hospitalPhone} | Email: ${hospitalEmail}`, { x: 50, y: waveHeight - 40, size: 10, color: rgb(1, 1, 1) });

  const pdfBytes = await doc.save();
  await fs.promises.writeFile(outputPath, pdfBytes);
}

export const uploadPrescription = async (
  appointment: Appointment,
  prescriptionItems: PrescriptionFormValues
): Promise<string | undefined> => {
  try {
    // @ts-ignore
    const hospitalData: Settings = await getCachedSetting()

    const doctorData = appointment.doctor;
    const patientData = appointment.patient;
    const fileName = `prescription_${patientData.name}_${appointment.$id}.pdf`;
    const sanitizedFileName = sanitizeFileName(fileName);
    const outputPath = path.join('./tmp', sanitizedFileName);

    // Ensure the tmp directory exists
    await ensureDir(path.dirname(outputPath));

    const date = new Date();

    // Generate the PDF and save it locally
    await generatePrescriptionPDF({
      hospitalAddress: hospitalData?.address,
      hospitalEmail: hospitalData.email,
      hospitalName: hospitalData.hospitalName,
      hospitalPhone: hospitalData.phone,
      hospitalSlogan: hospitalData.slogan,
      primaryColor: "#2663EA",
      doctorName: doctorData.name,
      doctorSpecialty: doctorData.areaOfExpertise,
      patientAge: calculateAge(patientData.birthDate),
      patientName: patientData.name,
      patientSex: patientData.gender,
      date: `${date.toLocaleDateString()}`,
      outputPath: outputPath,
      prescriptionItems: prescriptionItems,
    });

    // Read the generated PDF file
    const pdfBuffer = await readFile(outputPath);
      const buffer = Buffer.from(pdfBuffer);


    // Upload the file to Appwrite Storage
    const result = await storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID!,
      ID.unique(),
      InputFile.fromBuffer(buffer, `${appointment.$id}-${ID.unique()}-1.pdf`),
    );

    // Clean up: Delete the locally generated PDF file
    await unlink(outputPath);
revalidatePath("/doctor/[doctorId]/[appointmentId]/details")
revalidatePath("/appointments/[appointmentId]")
    // Return the file's URL
    // https://cloud.appwrite.io/v1/storage/buckets/668cfd080008f74af297/files/66c45119003296f5305c/view?project=668931320031b041524b&mode=admin
const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${result.$id}/view?project=668931320031b041524b`;
    await addPresprictionUrlToDb(appointment.$id, url)
    return url
  } catch (error) {
    console.error('Error generating or uploading the PDF:', error);
  }
};
