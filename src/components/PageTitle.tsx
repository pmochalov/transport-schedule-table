import { Skeleton } from "antd";
import * as React from "react";

type PageTitleProps = {
    title: string | React.ReactNode;
    loading: boolean;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, loading }) => {
    if (loading) {
        return (
            <Skeleton.Button
                size='large'
                shape='default'
                style={{ height: 72, width: "70%" }}
                block={true}
                active
            />
        );
    }

    return <h1>{title}</h1>;
};

export { PageTitle };
