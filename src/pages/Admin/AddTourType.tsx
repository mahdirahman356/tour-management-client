import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
const AddTourType = () => {
    const { data } = useGetTourTypeQuery(undefined)

    const [removeTourType] = useRemoveTourTypeMutation()
    const handleRemoveTourType = async (tourTypeId: string) => {
        const toastId = toast.loading("Removing...")
        try {

            const res = await removeTourType(tourTypeId).unwrap()
            
            if(res.success){
                toast.success("Removed", {id: toastId})
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center my-6">
                <h2 className="text-2xl font-semibold">Tour Type</h2>
                <AddTourTypeModal />
            </div>
            <div className="px-5 border border-muted rounded-md">
                <Table>
                    <TableCaption className="mb-3">A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-primary">Name</TableHead>
                            <TableHead className="text-right text-primary">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: { _id: string, name: string }) => (
                            <TableRow>
                                <TableCell className="font-medium w-full">{item.name}</TableCell>
                                <TableCell>
                                    <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                                        <Button size="sm">
                                            <Trash2 />
                                        </Button>
                                    </DeleteConfirmation>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AddTourType;