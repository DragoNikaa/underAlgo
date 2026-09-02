export interface ProviderSignupData {
  data: {
    email: Email[];
    user: {
      id?: number;
      display?: string;
      has_usable_password?: boolean;
      email?: string;
      username?: string;
    };
  };
}

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
}
