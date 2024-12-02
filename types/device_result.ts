export type device_result = {
    id: number;
    device_addr: string;
    battery_level: number;
    volume: number;
    is_tipped_over: boolean;
    latitude: number;
    longitude: number;
    timestamp: string;
}