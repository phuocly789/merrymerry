
export interface WishData {
  recipientName: string;
  email: string;
  message: string;
}

export enum AppState {
  INITIAL_LOADING = 'INITIAL_LOADING',
  LANDING = 'LANDING',
  SENDING = 'SENDING',
  SENT_SUCCESS = 'SENT_SUCCESS',
  SHOW_TREE = 'SHOW_TREE'
}
