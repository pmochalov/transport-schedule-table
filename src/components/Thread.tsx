import * as React from "react";
import { useParams } from "react-router-dom";

const Thread: React.FC = () => {
    let { uid } = useParams();
    return <h1>Список станций следования {uid}</h1>;
};

export { Thread };
