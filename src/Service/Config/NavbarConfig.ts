export interface INavItems {
  displayName: string;
  role: "All" | "Admin" | "Customer";
  navLink: string;
}

export default class NavbarConfig {
  static navbarItems: Array<INavItems> = [
    { displayName: "Home", role: "All" , navLink : "/" },
    { displayName: "Add Train", role: "Admin" , navLink : "/AddTrain" },
    { displayName : "Railway Details", role: "Admin" , navLink : "/RailwayDetails" },
    {displayName : "Upcoming Journeys" , role : "All" , navLink : "/UpcomingJourneys"}
  ];
  static userProfileItems: Array<string> = [ "Logout" ];
}
