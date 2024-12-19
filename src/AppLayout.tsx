import React from "react";
import { Layout, Col, Row } from "antd";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const layoutStyle = {
    overflow: "hidden",
    height: "100%",
    minHeight: "100%",
};

const contentStyle: React.CSSProperties = {
    width: "1200px",
    margin: "0 auto",
    padding: "32px 0",
    backgroundColor: "#fff",
};

const AppLayout: React.FC = () => {
    return (
        <Layout style={layoutStyle}>
            <Header />
            <Content style={contentStyle}>
                <Row>
                    <Col span={24}>
                        <Outlet />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export { AppLayout };
