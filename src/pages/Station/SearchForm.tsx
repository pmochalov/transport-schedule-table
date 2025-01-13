import {
    Radio,
    DatePicker,
    Row,
    Col,
    Space,
    Spin,
    Card,
    Button,
    RadioChangeEvent,
} from "antd";

import dayjs, { Dayjs } from "dayjs";

const dateFormat = "YYYY-MM-DD";

type Params = {
    event: string;
    date: string;
};

type SearchFormProps = {
    params: Params;
    handleChangeDate: (_date: Dayjs, dateString: string | string[]) => void;
    handleChangeEvent: (e: RadioChangeEvent) => void;
    handleSearch: () => void;
    loading: boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({
    params,
    handleChangeDate,
    handleChangeEvent,
    handleSearch,
    loading,
}) => {
    return (
        <Card>
            <Row gutter={{ xs: 8, sm: 16 }}>
                <Col>
                    <Radio.Group
                        value={params.event}
                        onChange={handleChangeEvent}
                        size='large'
                        disabled={loading}
                    >
                        <Radio.Button value='departure'>
                            Отправление
                        </Radio.Button>
                        <Radio.Button value='arrival'>Прибытие</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col>
                    <DatePicker
                        onChange={handleChangeDate}
                        size='large'
                        placeholder='Дата'
                        defaultValue={dayjs(params.date, dateFormat)}
                        format={dateFormat}
                        disabled={loading}
                    />
                </Col>
                <Col>
                    <Space>
                        <Button
                            onClick={handleSearch}
                            disabled={loading}
                            type='primary'
                            size='large'
                        >
                            Найти
                        </Button>

                        {loading && (
                            <span>
                                <Spin size='small' />
                            </span>
                        )}
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export { SearchForm };
