export interface BusInfo {
  routeId: string;
  routeName: string;
  arrivalTime?: string;
  isArriving?: boolean;
}

export interface StationCardProps {
  stationName: string;
  distance?: string;
  busList: BusInfo[];
  showAction?: boolean;
  actionText?: string;
}
