import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: "center",
    // backgroundColor: "#e1e1e1",
    // borderTop: "#e1e1e1 1px solid",
    borderRadius: 16,
};

const AppFooter: React.FC = () => {
    return (
        <Footer style={footerStyle}>
            <p>
                API:{" "}
                <a
                    href='https://yandex.ru/dev/rasp/raspapi'
                    title='Яндекс.Расписания'
                >
                    Яндекс.Расписания
                </a>
            </p>
            <p>
                Проект на{" "}
                <a
                    href='https://github.com/pmochalov/transport-schedule-table'
                    title='Проект на '
                >
                    github/@pmochalov
                </a>
            </p>
        </Footer>
    );
};

export { AppFooter };
