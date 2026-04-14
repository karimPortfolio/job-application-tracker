"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInformationsForm } from "@/features/profile/components/PersonalInformationsForm";
import { User } from "lucide-react";

export function GeneralClient() {
  return (
    <div className="w-full">
      <Card className="shadow-none">
        <CardHeader className="flex items-center gap-4 py-0">
          <User className="h-6 w-6" />
          <div>
            <CardTitle>Personal Informations</CardTitle>
            <CardDescription>Manage your personal informations</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <PersonalInformationsForm />
        </CardContent>
      </Card>
    </div>
  );
}
