import React from 'react';

interface Props {
  author: string;
  textQuote: string;
  onEditClick: React.MouseEventHandler;
  onDeleteClick?: React.MouseEventHandler;
}

const QuoteItem: React.FC<Props> = ({author, textQuote, onEditClick, onDeleteClick}) => {
  return (
    <div className="card mb-2 w-100 border-dark">
      <div className="card-body">
        <h3 className="border border-dark rounded-2 p-4">{author}</h3>
        <p className="border border-dark rounded-2 p-4">{textQuote}</p>
        <button
          className="btn btn-primary"
          onClick={onEditClick}
        >
          Edit
        </button>
        <button
          className="btn btn-primary"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuoteItem;
