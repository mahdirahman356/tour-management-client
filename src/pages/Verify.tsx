import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useSentOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const Verify = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [confirmed, setConfirmed] = useState(false)
    const [timer, setTimer] = useState(120)
    const [email] = useState(location.state)
    const [sentOtp] = useSentOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    useEffect(() => {
        if (!email) {
            navigate("/")
        }
    }, [email])

    const handleSentOtp = async () => {
        const toastId = toast.loading("Sending OTP")
        try {
            const res = await sentOtp({ email: email }).unwrap()
            if (res.success) {
                toast.success("OTP Sent", { id: toastId })
        setConfirmed(true)
        setTimer(120)
            }

        } catch (error) {
            console.log(error)
        } 
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        const userInfo = {
            email: email,
            otp: data.pin
        }
        try {
            const res = await verifyOtp(userInfo).unwrap()
            const toastId = toast.loading("Verifying OTP")
            if (res.success) {
                toast.success("OTP Verified", { id: toastId })
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!email || !confirmed) {
            return
        }
        const timerId = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timerId)
    }, [email, confirmed])

    return (
        <div className="grid place-content-center h-screen">
            {confirmed
                ? (<Card>
                    <CardHeader>
                        <CardTitle>Verify your email address</CardTitle>
                        <CardDescription>Please enter the 6 -digit code we sent to {email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <Dot />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                <Button
                                                    onClick={handleSentOtp}
                                                    type="button"
                                                    variant="link"
                                                    disabled={timer !== 0}
                                                    className={cn("p-0 m-0", {
                                                        "cursor-pointer": timer === 0,
                                                        "text-gray-500": timer !== 0
                                                    })}>
                                                    Resent OTP:
                                                </Button>{" "}
                                                {timer}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button form="otp-form" type="submit">Submit</Button>
                    </CardFooter>
                </Card>)
                : (<Card>
                    <CardHeader>
                        <CardTitle>Verify your email address</CardTitle>
                        <CardDescription>We will sent you an OTP at <br /> {email}</CardDescription>
                        {/* <CardAction>Card Action</CardAction> */}
                    </CardHeader>

                    <CardFooter>
                        <Button onClick={handleSentOtp} className="w-[300px]" form="otp-form" type="submit">Confirm</Button>
                    </CardFooter>
                </Card>)}

        </div>
    );
};

export default Verify;