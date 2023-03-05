
export interface ConfirmDialogData {
  width?: string;
  title: string;
  description: string;
  rejectText: string;
  acceptText: string;
  onAfterClosed: Function;
  onReject?: Function;
}

export interface PeriodicElement {
  code: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface AccountData {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  status: string;
  createAt: string;
  lastEdited: string;
  lastedEditPerson: string;
}

export interface ErrorDialogData {
  width?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onAccept: Function;
}

export interface PermissionGroup {
  key: string;
  name: string;
  permissions: Permission[];
  isChecked: boolean;
  isIndeterminateStatus: boolean;
  isExpanded: boolean;
}

export interface Permission {
  key: string;
  name: string;
  isChecked: boolean;
  group: string;
}

export interface SnackbarData {
  message: string;
}

export interface ResetPasswordAccount {
  username: string;
  givenName: string;
}

export interface PrizeLimitData {
  money: number;
  beginDate: string;
  status: string;
}

export interface RewardAccountDummy {
  phone: string;
  fullName: string;
  idNumber: string;
  requestCreationDate: string;
  requestDate: string;
  requestFrom: string;
  status: string;
}

export interface FilterFieldsInput {
  name: string;
  value: string;
}

export interface FilterFieldsSelect {
  name: string;
  value: string;
  options: string[];
}

export interface dummy {
  name: string;
  value: string;
}



export interface FilterFieldsMultiSelect {
  name: string;
  options: FilterSelect[];
}

export interface FilterSelect {
  value: any;
  viewValue: string;
}

export interface Field {
  value: string;
  name: string;
  completed: boolean;
}

export interface SaleLimitWarningNotification {
  balance: string;
  deposit: string;
  message?: string;
  notification: string;
}

export interface reasonDialogData {
  title?: string;
  label?: string;
  acceptText?: string;
  rejectText?: string;
}

export interface SearchBox {
  placeholder: string;
  maxlength?: number;
  width?: string;
}

export interface Filter {
  name: string;
  code: string;
  buttonWidth?: string;
  options: FilterSelect[];
  initialOption?: FilterSelect;
}

export interface FilterOptions {
  code: string;
  options: FilterSelect[];
}

export interface FilterSelectOption {
  code: string;
  value: any;
  viewValue: string;
}

export interface MultiChoiceConfirmDialogData {
  width?: string;
  title: string;
  description: string;
  confirmButtons: Array<string>;
  rejectText: string;
  onAfterClosed: Function;
  onReject?: Function;
}

export interface HighlightCondition {
  conditionName: string;
  conditionValue: any; 
}

//Show luot tuong tac
export interface InteractionDisplay{
  color?: string;
  icon: string
}

//Bảng thông tin
export interface InfoTable{
  name?: string;
  description: string;
  value: string;
}