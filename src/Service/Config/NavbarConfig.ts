export interface INavItems {
  displayName: string;
  role: "All" | "Admin" | "Customer";
  navLink: string;
}

export default class NavbarConfig {
  static navbarItems: Array<INavItems> = [
    { displayName: "Railway Stations", role: "Admin" , navLink : "/RailwayStations" },
    { displayName: "Add Train", role: "Admin" , navLink : "/AddTrain" },
  ];
}
