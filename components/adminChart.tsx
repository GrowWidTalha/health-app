"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { prepareAppointmentChartData } from '@/lib/utils'
import { Appointment } from '@/types/appwrite.types'
import { AppointmentStats } from './cards/appointmentStats'

interface AppointmentAnalyticsChartProps {
  appointments: Appointment[]
}

const chartConfig: ChartConfig = {
  count: {
    label: "Appointments",
    color: "hsl(var(--primary))",
  },
}

export function AppointmentAnalyticsChart({ appointments }: AppointmentAnalyticsChartProps) {
  const chartData = prepareAppointmentChartData(appointments)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Appointment Analytics</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Number of appointments created in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
      <AppointmentStats appointments={appointments} />
        <ChartContainer config={chartConfig} className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return window.innerWidth < 500
                    ? date.toLocaleDateString('en-US', { day: 'numeric' })
                    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                }}
                interval="preserveStartEnd"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                //   @ts-ignore
                    formatter={(value: number) => [`${value} appointments`, "Count"]}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
                name="Appointments"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
