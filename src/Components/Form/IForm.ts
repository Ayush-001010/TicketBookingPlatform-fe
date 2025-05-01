import { IFormTypes } from "../../Service/Form/formConfig";

export default interface IForm {
  formType: keyof IFormTypes;
  formtitle?: string;
  button1Text?:string;
  button2Text?:string;
  classNameButton?:string;
  option?:any;
  passingeValueToParent?: (value : any) => void;
  information?:any;
  intialValue?:any; 
  headerCssClassName?:string;
  formCSSClassName?:string;
}
