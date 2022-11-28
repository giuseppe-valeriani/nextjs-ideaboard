import React, { useState } from 'react';
import { Idea } from '../pages/index';

type Props = {
  card: Idea;
  cancel: Function;
  editCard: Function;
};

const Tile = ({ card, cancel, editCard }: Props) => {
  const [title, setTitle] = useState<string>(card.title);
  const [content, setContent] = useState<string>(card.content);
  const [time, setTime] = useState<string>(card.date);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getTitle = (e: React.FormEvent<HTMLInputElement>): void => {
    setTitle((e.target as HTMLInputElement).value);
    setTime(new Date().toLocaleString());
  };

  const getContent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent((e.target as HTMLInputElement).value);
    setTime(new Date().toLocaleString());
    let howLong = e.target.value.length;
    if (howLong === 140) {
      setError('Max length reached');
    }
    if (howLong >= 130 && howLong < 140) {
      setError('Max length almost reached');
    }
    if (howLong < 130) {
      setError('');
    }
  };

  const editMode = (): void => {
    setEdit(!edit);

    if (edit) {
      const updateCard = {
        title: title,
        content: content,
        date: new Date().toLocaleString(),
        id: card.id,
      };

      editCard(updateCard);
    }
  };

  const erase = (): void => {
    cancel(card);
  };

  return (
    <>
      <div>
        {edit ? (
          <div>
            <input type="text" value={title} onChange={getTitle} />
            <input
              type="text"
              value={content}
              onChange={getContent}
              maxLength={140}
            />
            <div className="error">{error}</div>
          </div>
        ) : (
          <div className="card">
            <div className="card-title">{title}</div>
            {content}
            <div>{time}</div>
          </div>
        )}
      </div>
      <div>
        <button className="button edit" onClick={editMode}>
          {edit ? 'Save' : 'Edit'}
        </button>
        <button className="button delete" onClick={erase}>
          Remove
        </button>
      </div>
    </>
  );
};

export default Tile;
