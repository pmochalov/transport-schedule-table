import { useSearchParams } from "react-router-dom";
import { Event, EventDate } from "../types";
import dayjs from "dayjs";

const useStationParams = (): any => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramsObj = Object.fromEntries(searchParams.entries());

    const event: Event =
        paramsObj.event && ["departure", "arrival"].includes(paramsObj.event)
            ? (paramsObj.event as Event)
            : "departure";

    const date: EventDate = paramsObj.date ?? dayjs().format("YYYY-MM-DD");

    return {
        setSearchParams,
        params: {
            event,
            date,
        },
    };
};

export default useStationParams;
