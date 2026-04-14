"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInformationsForm } from "@/features/profile/components/PersonalInformationsForm";
import { SecuritySettingsForm } from "@/features/profile/components/SecuritySettingsForm";
import { User } from "lucide-react";

export function SecurityClient() {
  return (
    <div className="w-full">
      <Card className="shadow-none">
        <CardHeader className="flex items-center gap-4 py-0">
          <User className="h-6 w-6" />
          <div>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your secure settings</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <SecuritySettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
