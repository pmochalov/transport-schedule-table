import * as React from "react";
import { useRouteError } from "react-router-dom";

type ErrorType = {
    status?: number;
    statusText?: string;
    message?: string;
};

const ErrorPage: React.FC = () => {
    let error: any = useRouteError() as ErrorType;

    return (
        <div>
            <h1>Ошибка</h1>
            <p>Статус: {error.status}</p>
            <p>Сообщение: {error.statusText || error.message}</p>
        </div>
    );
};

export { ErrorPage };
