import React, {useCallback, useEffect, useState} from 'react';
import {categories} from "../../constants";
import {Quote, QuoteApi} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import AxiosApi from "../../axiosApi";


const FormQuote: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote>({
    author: '',
    category: '',
    text: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (id: string) => {
    const url = '/quotes/' + id + '.json'
    try {
      const response = await AxiosApi.get(url);
      setQuote(response.data)
    } finally {
    }
  }, [])

  useEffect(() => {
    if (id) {
      fetchData(id).catch(console.error);
    }
  }, [fetchData, id]);

  const onFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setQuote(prev => ({...prev, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (quote.author && quote.text && quote.category) {
      try {
        await AxiosApi.post('/quotes.json', quote)
      } catch (e) {
        throw new Error();
      } finally {
        setLoading(false);
        navigate('/');
      }
    } else {
      alert('Не все поля заполнены!');
      setLoading(false);
    }
  }

  const updateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = '/quotes/' + id + '.json'
    if (quote.author && quote.text && quote.category) {
      try {
        await AxiosApi.put(url, quote)
      } catch (e) {
        throw new Error();
      } finally {
        setLoading(false);
        navigate('/');
      }
    } else {
      alert('Не все поля заполнены!');
      setLoading(false);
    }
  };


  return (
        <form onSubmit={id ? updateQuote : onSubmit}
              className="w-100">
          <div className="form-group">
          <label>
            <p>Category</p>
            <select
              className="rounded"
              value={quote.category}
              name="category"
              onChange={onFormChange}
              required
            >
              <option disabled>Выберите категорию</option>
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
          </div>
          <div className="form-group">
          <label>
            <p>Title</p>
            <input
              className="rounded"
              type="text"
              name="author"
              value={quote.author}
              onChange={onFormChange}
            />
          </label>
          </div>
          <div className="form-group">

          <label>
            <p>Description</p>
            <textarea
              className="rounded"
              name="text"
              value={quote.text}
              onChange={onFormChange}
            />
          </label>
          </div>

          <button
            className="btn btn-info text-uppercase"
            type="submit"
          >
            {id ? 'update' : 'add'}
          </button>
        </form>
  );
};

export default FormQuote;