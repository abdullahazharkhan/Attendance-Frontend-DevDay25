import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    att_code: z.string().length(8, {
        message: "Enter the eight chars long code sent to your email.",
    }),
})

export function AttForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            att_code: "",
        },
    })

    async function markAttendance(att_code) {
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
                }
            },
            (geoError) => {
                toast.error("Geolocation error: " + geoError.message);
                console.error("Geolocation error:", geoError.message);
            }
        );
    }

    function onSubmit(values) {
        markAttendance(values.att_code);
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
                <Button type="submit" className="w-full">Mark as present</Button>
            </form>
        </Form>
    )
}

