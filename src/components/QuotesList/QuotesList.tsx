import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Quote, QuoteList} from "../../types";
import Spinner from "../Spinner/Spinner";
import QuoteItem from "../QuoteItem/QuoteItem";

const QuotesList = () => {
  const params = useParams();
  const selectCategoryId = params.id;

  const navigate = useNavigate();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);


  const getQuotes = async () => {
    let response;

    if (selectCategoryId) {
      response = await axiosApi.get<QuoteList>(`/quotes.json?orderBy="category"&equalTo="${selectCategoryId}"`);
    } else {
      response = await axiosApi.get<QuoteList>(`/quotes.json`);
    }

    return response;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const quotes = await getQuotes();

        const quotesResponse = Object.keys(quotes.data).map(item => {
          const oneQuote = quotes.data[item];
          oneQuote.id = item;
          return oneQuote;
        });
        setQuotes(quotesResponse);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectCategoryId]);


  const onEdit = (id: string) => {
    navigate('/quotes/' + id + '/edit');
  };


  const onRemovePost = async (id: string) => {
    try {
      await axiosApi.delete('/quotes/' + id + '.json');
      await getQuotes();
      // navigate('/');
    } catch (e) {
      throw new Error();
    } finally {
      navigate('/');
    }
  }


  return (
    <div className="QuotesList">
      <div className="me-2">

        list

        {loading ? <Spinner/> : (
          quotes!.map((item) => (
            <QuoteItem key={Math.random()} author={item.author} textQuote={item.text} onEditClick={() => onEdit(selectCategoryId!)} onDeleteClick={() => onRemovePost(selectCategoryId!)}/>
          ))
        )}
      </div>
    </div>
  );
};

export default QuotesList;