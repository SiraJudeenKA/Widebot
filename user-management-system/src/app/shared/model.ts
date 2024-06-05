export interface localization {
    en: translateDetails;
    arab: translateDetails;
}

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
    welcome: string
}

export interface userDetails {
    firstName: string;
    lastName: string;
    profileUrl: string;
    email: string;
    address: string;
}
