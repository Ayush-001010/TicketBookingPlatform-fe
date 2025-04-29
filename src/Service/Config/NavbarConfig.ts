export interface INavItems {
  displayName: string;
  role: "All" | "Admin" | "Customer";
  navLink: string;
}

export default class NavbarConfig {
  static navbarItems: Array<INavItems> = [
    { displayName: "Home", role: "All" , navLink : "/" },
    { displayName: "Add Train", role: "Admin" , navLink : "/AddTrain" },
    { displayName : "Railway Stations", role: "Admin" , navLink : "/RailwayStations" },
  ];
  static userProfileItems: Array<string> = [ "Upcoming Journeys" , "Past Journeys" , "Logout" ];
}
