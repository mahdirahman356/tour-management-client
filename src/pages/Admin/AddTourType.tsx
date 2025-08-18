import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { useState } from "react";
const AddTourType = () => {

    const [currentPage, setCurrentPage] = useState(1)
    console.log(currentPage)

    const { data } = useGetTourTypeQuery({ page: currentPage, limit: 10 })
    const totalPage = data?.meta?.totalPage || 1;

    const [removeTourType] = useRemoveTourTypeMutation()
    const handleRemoveTourType = async (tourTypeId: string) => {
        const toastId = toast.loading("Removing...")
        try {

            const res = await removeTourType(tourTypeId).unwrap()

            if (res.success) {
                toast.success("Removed", { id: toastId })
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
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-primary">Name</TableHead>
                            <TableHead className="text-right text-primary">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: { _id: string, name: string }) => (
                            <TableRow key={item._id}>
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
            {totalPage > 1 &&
                <div className="flex justify-end mt-4">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                        className={currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"} />
                                </PaginationItem>

                                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                    (page) => (
                                        <PaginationItem
                                            key={page}
                                            onClick={() => setCurrentPage(page)}>
                                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                        </PaginationItem>
                                    )
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                        className={currentPage === totalPage
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>}
        </div>
    );
};

export default AddTourType;