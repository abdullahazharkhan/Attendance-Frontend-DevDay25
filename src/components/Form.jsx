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
import { BarLoader, BeatLoader } from "react-spinners";
import Turnstile from "react-turnstile";
import { FaCheck } from "react-icons/fa6";

const formSchema = z.object({
    att_code: z.string().length(8, {
        message: "Enter the eight chars long code sent to your email.",
    }),
});

export function AttForm({ page, setAttendedTeam }) {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [team, setTeam] = useState([]);
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            att_code: "",
        },
    });

    async function onSubmit(values) {
        setLoading(true);
        const att_code = values.att_code;
        if (token === "") {
            toast.error("Verifying that you're not a robot.");
            return;
        }
        if (page === "Attendance") {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = 24.8569039, longitude = 67.2621089;
                    // const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.post("http://localhost:4000/api/attendance/mark", {
                            att_code,
                            latitude,
                            longitude,
                        });
                        toast.success(response.data.message);
                        setIsAttendanceMarked(true);
                        setAttendedTeam(response.data.team);
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
            try {
                const response = await axios.post("http://localhost:4000/api/certificates", {
                    att_code,
                });
                toast.success(response.data.message);
                console.log(response.data.downloadTokens);
                setTeam(response.data.downloadTokens);
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
        }
    }

    const downloadCertificate = async (downloadUrl, memberName) => {
        try {
            const response = await axios.get(`http://localhost:4000${downloadUrl}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            let fileName = `${memberName}-certificate.pdf`;
            const contentDisposition = response.headers["content-disposition"];
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (error.response && error.response.data) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const errorObj = JSON.parse(reader.result);
                        toast.error(errorObj.message || "Certificate download error");
                    } catch (e) {
                        toast.error("Certificate download error");
                    }
                };
                reader.readAsText(error.response.data);
            } else {
                toast.error("Error downloading certificate");
            }
        }
    };

    if (team.length > 0) {
        return (
            <>
                <h1 className="text-2xl font-semibold">Click to download certificates</h1>
                <div className="w-full flex gap-4 flex-wrap justify-center border-t pt-5 border-[#ff33339f]">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            onClick={() => downloadCertificate(member.downloadUrl, member.memberName)}
                            className="flex bg-[#ff33339f] rounded-md items-center justify-center text-sm px-3 py-2 cursor-pointer"
                        >
                            <p>{member.memberName}</p>
                        </div>
                    ))}
                </div>
            </>
        );
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
                <div className="w-full my-4">
                    {token === "" ? (
                        <div className="flex gap-2 items-center justify-center text-sm">
                            <BeatLoader color="#ff33339f" size={10} />
                            <p>Verifying that you&apos;re not a robot.</p>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center justify-center text-sm">
                            <FaCheck className="text-[#ff33339f] text-lg" />
                            <p>Verified.</p>
                        </div>
                    )}
                </div>
                <Turnstile
                    className="w-full"
                    sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onVerify={(token) => setToken(token)}
                    onError={(error) => toast.error("Verification Error: " + error)}
                    onExpire={() => console.log("Turnstile Expired")}
                />
                <Button
                    type="submit"
                    className="w-full disabled:cursor-not-allowed"
                    disabled={loading && token === ""}
                >
                    {loading ? (
                        <BarLoader color="#fff" />
                    ) : page === "Attendance" ? (
                        "Mark as Present"
                    ) : (
                        "Get Certificate"
                    )}
                </Button>
            </form>
        </Form>
    );
}
