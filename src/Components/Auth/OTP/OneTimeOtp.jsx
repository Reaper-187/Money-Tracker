import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const OneTimeOtp = () => {
  return (
    <div className="min-h-screen flex justify-self-center items-center space-x-3">
      <Card className="w-full p-5">
        <h1 className="text-center text-2xl font-semibold">
          OTP-Authentication
        </h1>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button>Submit</Button>
      </Card>
    </div>
  );
};
