export interface Quote {
  id?: string;
  author: string;
  category: string;
  text: string;
}

export type QuoteApi = Omit<Quote, 'id'>;

