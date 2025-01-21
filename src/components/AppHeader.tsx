import * as React from "react";
import { Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    height: "clamp(40px, 50vw, 150px)",
    fontSize: "clamp(16px, 2rem, 32px)",
    lineHeight: "clamp(18px, 2rem, 40px)",
    textAlign: "center",
    // background: "linear-gradient(to right, #ff9966, #ff5e62)",
    background: "linear-gradient(to right, #f2709c, #ff9472)",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
};

const AppHeader: React.FC = () => {
    const { pathname } = useLocation();

    const text: string = "Расписание вокзалов Архангельска";
    const headerData =
        pathname === "/" ? (
            text
        ) : (
            <Link to='/' title={text}>
                {text}
            </Link>
        );

    return <Header style={headerStyle}>{headerData}</Header>;
};

export { AppHeader };
