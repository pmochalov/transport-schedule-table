import React from "react";
import { Radio } from "antd";
import { Transport } from "../types";

const TransportSelector: React.FC = () => {
    const [size, setSize] = React.useState<Transport>("all");

    React.useEffect(() => {
        console.log(size);
    }, [size]);

    return (
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value='all'>Любой</Radio.Button>
            <Radio.Button value='train'>Поезд</Radio.Button>
            <Radio.Button value='plane'>Самолёт</Radio.Button>
            <Radio.Button value='bus'>Автобус</Radio.Button>
        </Radio.Group>
    );
};

export { TransportSelector };
