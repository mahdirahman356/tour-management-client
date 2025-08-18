import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

const TourFilters = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    console.log("division", searchParams.get("division"))
    console.log("tourType", searchParams.get("tourType"))

    const selectedDivision = searchParams.get("division") || undefined;
    const selectedTourType = searchParams.get("tourType") || undefined

    const { data: divisionData, isLoading: divisionIsLoading } =
        useGetDivisionQuery(undefined);

    const { data: tourTypeData, isLoading: tourTypeIsLoading } =
        useGetTourTypeQuery({ limit: 1000, fields: "_id,name" });

    const divisionOption = divisionData?.map(
        (item: { _id: string; name: string }) => ({
            label: item.name,
            value: item._id,
        })
    );

    const tourTypeOptions = tourTypeData?.data?.map(
        (item: { _id: string; name: string }) => ({
            label: item.name,
            value: item._id,
        })
    );

    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("division", value)
        setSearchParams(params)
    }

    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("tourType", value)
        setSearchParams(params)
    }

    const handleClearFilter = () => { 
         const params = new URLSearchParams(searchParams)
        params.delete("division")
        params.delete("tourType")
        setSearchParams(params)
    }

    return (
        <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleClearFilter}>
                    Clear Filter
                </Button>
            </div>
            <div>
                <Label className="mb-2">Division to visit</Label>
                <Select
                    disabled={divisionIsLoading}
                    value={selectedDivision ? selectedDivision : ""}
                    onValueChange={handleDivisionChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {divisionOption?.map((item: { value: string; label: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-2">Tour Type</Label>
                <Select
                    disabled={tourTypeIsLoading}
                    value={selectedTourType ? selectedTourType : ""}
                    onValueChange={handleTourTypeChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {tourTypeOptions?.map(
                                (item: { value: string; label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TourFilters;