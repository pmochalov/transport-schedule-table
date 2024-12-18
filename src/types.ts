export type Transport = "all" | "plane" | "train" | "bus";

export type Station = {
    type: string;
    title: string;
    short_title: string;
    popular_title: string;
    code: string;
    station_type: string;
    station_type_name: string;
    transport_type: Transport;
}

export type Thread = {
    title: string;
    uid: string;
}
