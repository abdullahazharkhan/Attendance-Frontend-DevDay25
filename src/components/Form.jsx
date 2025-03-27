import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BarLoader } from "react-spinners";
import Turnstile from "react-turnstile";


const formSchema = z.object({
    att_code: z.string().length(8, {
        message: "Enter the eight chars long code sent to your email.",
    }),
});

export function AttForm({ page }) {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            att_code: "",
        },
    });

    async function onSubmit(values) {
        const att_code = values.att_code;
        if (token === "") {
            toast.error("Please verify that you are not a robot.");
            return;
        } else if (page === "Attendance") {
            // thore masle wala code
            /*
            setLoading(true);
            const formData = new FormData();
            formData.append('secret', process.env.VITE_TURNSTILE_SECRET_KEY);
            formData.append('response', token);
            try {
                const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                    body: formData,
                    method: 'POST',
                });
                const outcome = await result.json();
                if (outcome.success) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            try {
                                const response = await axios.post("http://localhost:4000/api/attendance/mark", {
                                    att_code,
                                    latitude,
                                    longitude,
                                });
                                toast.success(response.data.message);
                                console.log(response.data.team);
                            } catch (error) {
                                if (error.response) {
                                    toast.error(error.response.data.message);
                                    console.error("API Error:", error.response.data.message);
                                } else if (error.request) {
                                    toast.error("No response from server");
                                    console.error("No response from server:", error.request);
                                } else {
                                    toast.error("Error setting up request: " + error.message);
                                    console.error("Error setting up request:", error.message);
                                }
                            } finally {
                                setLoading(false);
                            }
                        },
                        (geoError) => {
                            toast.error("Geolocation error: " + geoError.message);
                            console.error("Geolocation error:", geoError.message);
                            setLoading(false);
                        }
                    );
                }
            } catch (err) {
                console.error(err);
                toast.error("Error verifying Turnstile token");
                setLoading(false);
            }
            */

            // chalne wala code
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.post("http://localhost:4000/api/attendance/mark", {
                            att_code,
                            latitude,
                            longitude,
                        });
                        toast.success(response.data.message);
                        console.log(response.data.team);
                    } catch (error) {
                        if (error.response) {
                            toast.error(error.response.data.message);
                            console.error("API Error:", error.response.data.message);
                        } else if (error.request) {
                            toast.error("No response from server");
                            console.error("No response from server:", error.request);
                        } else {
                            toast.error("Error setting up request: " + error.message);
                            console.error("Error setting up request:", error.message);
                        }
                    } finally {
                        setLoading(false);
                    }
                },
                (geoError) => {
                    toast.error("Geolocation error: " + geoError.message);
                    console.error("Geolocation error:", geoError.message);
                    setLoading(false);
                }
            );
        } else if (page === "Certificate") {
            // certificate generation logic
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
                <FormField
                    className="w-full"
                    control={form.control}
                    name="att_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Enter code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Turnstile className="w-full mt-3.5"
                    sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onVerify={(token) => setToken(token)}
                    onError={(error) => toast.error("Verification Error: " + error)}
                    onExpire={() => console.log("Turnstile Expired")}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                        ? <BarLoader color="#fff" />
                        : page === "Attendance"
                            ? "Mark as Present"
                            : "Get Certificate"}
                </Button>
            </form>
        </Form>
    );
}
