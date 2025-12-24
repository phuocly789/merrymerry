
export interface WishData {
  recipientName: string;
  email: string;
  message: string;
}

export enum AppState {
  LANDING = 'LANDING',
  SENDING = 'SENDING',
  SENT_SUCCESS = 'SENT_SUCCESS',
  SHOW_TREE = 'SHOW_TREE'
}
