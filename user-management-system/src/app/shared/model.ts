export interface localization {
    en: translateDetails;
    arab: translateDetails;
}

export interface translateDetails {
    firstName: string;
    lastName: string;
    profileUrl: string;
    address: string;
    save: string;
    cancel: string;
    update: string;
    back: string;
    action: string;
    tableColumn: string[]
}
