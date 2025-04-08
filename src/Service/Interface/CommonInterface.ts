export interface IDashboardColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}
export interface IOptions {
  value: any;
  label: string;
}
export interface IFilter {
  displayName: string;
  backendName: string;
  options: Array<IOptions>;
}

export interface IForm {
  displayName: string;
  backendName: string;
  type: string;
}