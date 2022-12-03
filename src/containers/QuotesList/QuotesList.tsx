import React, {useCallback, useEffect, useState} from 'react';
import {Quote, QuoteApi, QuoteList} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import QuoteItem from "../../components/QuoteItem/QuoteItem";
import AxiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const QuotesBlock = () => {
  let url = 'quotes.json';

  const navigate = useNavigate();
  const {category} = useParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  if (category) {
    url = '/quotes.json?orderBy="category"&equalTo="' + category + '"';
  }

  const getQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosApi.get<QuoteList>(url);
      let quote: Quote[] = [];
      if (response.data !== null) {
        quote = Object.keys(response.data).map(key => {
          const quote = response.data[key];
          quote.id = key;
          return quote;
        });
      }
      setQuotes(quote);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getQuotes().catch(console.error);
  }, [getQuotes]);

  const onChange = (id: string) => {
    navigate('quotes/' + id + '/edit');
  };

  const onDelete = async (id: string) => {
    try {
      await AxiosApi.delete<QuoteApi>('/quotes/' + id + '.json')
    } finally {
      getQuotes().catch(console.error);
    }
  };

  return (
    <div className="container">
      {loading ? <Spinner/> : quotes.length > 0 ? <div>{quotes.map(item => (
        <QuoteItem
          key={item.id}
          author={item.author}
          textQuote={item.text}
          onEditClick={() => onChange(item.id!) }
          onDeleteClick={() => onDelete(item.id!)}/>
      ))}</div> :
        <p>No quotes yet!</p>
      }
    </div>
  );
};

export default QuotesBlock;

