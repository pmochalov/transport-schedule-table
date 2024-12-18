import * as React from "react";
import { useParams } from "react-router-dom";

const Station: React.FC = () => {
    let { stationId } = useParams();
    return <>Расписание по станции {stationId}</>;
};

export { Station };
