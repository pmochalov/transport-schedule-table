export type Transport = "all" | "plane" | "train" | "bus";

export type Event = "arrival" | "departure";
export type EventDate = null | string; // дата отправления/прибытия

// export type SearchParams = {
//     event: Event;
//     date: EventDate;
// }

// Станция
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

// Остановка
export type Stop = {
    station: Station;
    arrival: string | null;
    departure: string | null;
}

// Расписание
export type Thread = {
    title: string;
    uid: string;
    number: string;
    short_title: string;
    stops: Stop[]
}
