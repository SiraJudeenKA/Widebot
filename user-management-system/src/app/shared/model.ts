/**
 * Interface used to localization for english and arabic
 */
export interface localization {
    en: translateDetails;
    arab: translateDetails;
}
/**
 * Interface used for the all the static data to show translate data.
 */
export interface translateDetails {
    firstName: string;
    lastName: string;
    profileUrl: string;
    email: string;
    address: string;
    save: string;
    cancel: string;
    update: string;
    back: string;
    action: string;
    search: string,
    userList: string,
    listDescription: string,
    noUserFound: string,
    noImageFound: string,
    addImageText: string,
    firstNamePlaceHolder: string,
    lastNamePlaceHolder: string,
    addressPlaceHolder: string,
    emailPlaceHolder: string,
    profileUrlPlaceHolder: string,
    matTooltip: string,
    basicInformation: string,
    addUser: string,
    emailValidField: string,
    firstNameValid: string,
    lastNameValid: string,
    tableColumn: string[],
    dialogHeading: string,
    dialogHeadingDescription: string,
    deleteDialogDescription: string,
    yes: string,
    no: string,
    edit: string,
    welcome: string,
    savedDetails: string,
    invalidDetails: string,
    failedTosave: string,
    okay: string,
    someThingWrong: string,
    addressValidField: string
    deleteDetails: string,
    localizationButton: string,
    logout: string,
    deleteSuccess: string,
    homePage: string,
    searchText: string
}
/**
 * Interface used to the user details
 */
export interface userDetails {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    profileUrl: string | null;
    email: string | null;
    address: string | null;
}
/**
 * Interface used for current user details.
 */
export interface currentUserDetails {
    role: string,
    credentials: boolean
}