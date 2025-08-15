import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {

    const [image, setImage] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [addDivision] = useAddDivisionMutation()

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData()
        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)
        const toastId = toast.loading("Loading...")

        try {

            const res = await addDivision(formData).unwrap()
            console.log(res)

            if(res.success){
                toast.success("Division Added", {id: toastId})
                setOpen(false)
            }

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form id="add-division" className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SingleImageUploader onChange={setImage} />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={!image} type="submit" form="add-division">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
