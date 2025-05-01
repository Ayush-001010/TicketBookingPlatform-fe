export default interface IModalForm {
    open : boolean;
    onCloseFunc : () => void;
    formType : string;
    formtitle: string;
    initialValues?:any;
    formOptions?:any;
    gettingValuesFromForm: (values: any) => void;
    headerCssClassName?: string;
}