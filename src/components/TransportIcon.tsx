import * as React from "react";
import { Transport } from "../types";

type TransportProps = {
    type: Transport;
};

const TransportIcon: React.FC<TransportProps> = ({ type }) => {
    const types = {
        train: "🚇",
        plane: "✈️",
        bus: "🚍",
    };

    return <>{types[type]}</>;
};

export { TransportIcon };
