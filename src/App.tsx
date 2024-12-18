import React from "react";
import { Layout, Col, Row, Flex } from "antd";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

// import { useAppDispatch, useAppSelector } from "./hooks";
// import { fetchUsers, resetUsersState } from "./slices/usersSlice";
// import { RootState } from "./store";

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

const App: React.FC = () => {
    // const dispatch = useAppDispatch();

    // const {
    //     entities: users,
    //     loading,
    //     error,
    // } = useAppSelector((state: RootState) => state.users);

    // React.useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [dispatch]);

    // React.useEffect(() => {
    //     return () => {
    //         dispatch(resetUsersState());
    //     };
    // }, []);

    // if (loading) {
    //     return <div>Загрузка...</div>;
    // }

    // if (error) {
    //     return <div>Ошибка: {error}</div>;
    // }

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

export { App };
