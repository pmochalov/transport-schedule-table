import * as React from "react";
import { useParams } from "react-router-dom";

const Station: React.FC = () => {
    let { stationId } = useParams();
    return <h1>Расписание по станции {stationId}</h1>;
};

export { Station };
