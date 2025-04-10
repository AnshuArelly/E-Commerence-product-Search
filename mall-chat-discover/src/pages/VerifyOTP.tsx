
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import OtpInput from "otp-input-react";
import { toast } from "@/components/ui/use-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");

  const verifyOtpMutation = useMutation({
    mutationFn: async (otp: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "OTP Verified",
        description: "Your OTP has been verified successfully.",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to verify OTP.",
        variant: "destructive",
      });
    },
  });

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate(otp);
  };

  const renderInput = (props: any) => {
    return (
      <div className="flex justify-between gap-2">
        {props.cells.map((cell: any, i: number) => (
          <div 
            key={i}
            className={cn(
              "relative flex h-14 w-10 items-center justify-center rounded-md border text-sm transition-all",
              cell.hasFakeCaret && "animate-pulse",
              cell.isActive && "border-primary",
              !cell.isActive && cell.char && "border-border bg-secondary text-foreground"
            )}
          >
            {cell.char || " "}
            <input
              index={i}
              style={{
                MozAppearance: "textfield",
                caretColor: "transparent",
              }}
              readOnly={true}
              isActive={cell.isActive}
              char={cell.char}
              hasFakeCaret={cell.hasFakeCaret}
              key={cell.key}
              {...props.getCellProps({
                elemIndex: i,
              })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit OTP sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={renderInput}
              inputStyle={{
                width: "100%",
                padding: "0",
                margin: "0",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                textAlign: "center",
                font: "inherit",
                color: "inherit",
              }}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            />
          </div>
          <Button onClick={handleVerifyOtp} disabled={verifyOtpMutation.isPending}>
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
