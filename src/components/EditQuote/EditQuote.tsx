import React, {FormEvent, useState} from 'react';
import {categories} from "../../constants";
import {Quote, QuoteApi} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import "./EditQuote.css";

interface Props {
  // onSubmitForm: (post: QuoteApi) => void;
  existingQuote?: QuoteApi;
}

const EditQuote: React.FC<Props> = ({existingQuote}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const initialState = existingQuote ? {
    ...existingQuote,
  } : {
    author: '',
    category: '',
    text: '',
  }

  const [quote, setQuote] = useState<QuoteApi>(initialState);
  const [loading, setLoading] = useState(false);


  const onFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setQuote(prev => ({...prev, [name]: value}));
  };

  const sendCreateQuoteRequest = async () => {
    await axiosApi.post('/quotes.json', {
      category: quote.category,
      author: quote.author,
      text: quote.text
    });
  };


  const createQuote = async () => {
    setLoading(true);

    try {
      if (quote.category && quote.author && quote.text) {
        await sendCreateQuoteRequest();

        setQuote({
          category: categories[0].id,
          author: '',
          text: ''
        });

        navigate('/');
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };



  const sendUpdateQuoteRequest = async () => {
    await axiosApi.put('quotes/' + id + '.json', {
      category: quote.category,
      author: quote.author,
      text: quote.text
    });
  };

  const updateQuote = async () => {
    try {
      if (quote.category && quote.author && quote.text) {
        await sendUpdateQuoteRequest();
      } else {

      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      await updateQuote();
    } else {
      await createQuote();
    }
  }

  return (
    <div className="EditQuoteForm">
        <div className="Container">
          <form onSubmit={onFormSubmit}>
            <label>
              <p>Category</p>
              <select
                value={quote.category}
                name="category"
                onChange={onFormChange}
              >
                {categories.map(category => (
                  <option
                    value={category.id}
                    key={category.id}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Title</p>
              <input
                type="text"
                name="author"
                value={quote.author}
                onChange={onFormChange}
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                name="text"
                value={quote.text}
                onChange={onFormChange}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
    </div>
  );
};

export default EditQuote;