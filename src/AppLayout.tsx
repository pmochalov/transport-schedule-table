import React from "react";
import { AppHeader } from "./components/AppHeader";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import { AppFooter } from "./components/AppFooter";
const { Content } = Layout;

const layoutStyle = {
    minHeight: "100%",
    overflow: "hidden",
    padding: "32px 0",
};

const contentStyle: React.CSSProperties = {
    width: "clamp(320px, 50vw, 1200px)",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px",
    backgroundColor: "#fff",
    display: "grid",
    gridAutoRows: "auto 1fr auto",
    gap: 32,
    borderRadius: 16,
};

const AppLayout: React.FC = () => (
    <Layout style={layoutStyle}>
        <Content style={contentStyle}>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </Content>
    </Layout>
);
export { AppLayout };
