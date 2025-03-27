import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z.object({
	att_code: z.string().length(7, {
		message: "Enter the seven chars long code sent to your email.",
	}),
});

export function AttForm() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			att_code: "",
		},
	});

	function onSubmit(values) {
		toast("Attendance marked successfully");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=" space-y-2 w-full">
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
				<Button type="submit" className="w-full">
					Mark as present
				</Button>
			</form>
		</Form>
	);
}
