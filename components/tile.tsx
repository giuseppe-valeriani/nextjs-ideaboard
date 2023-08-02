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
    <div className="board">
      {edit ? (
        <div className="tile-box__inputs">
          <input
            type="text"
            value={title}
            onChange={getTitle}
            aria-label="Title"
          />
          <input
            type="text"
            value={content}
            onChange={getContent}
            aria-label="Content"
            maxLength={140}
          />
          <div className="tile-box__error">{error}</div>
          <div className="tile-box__edit">
            <button onClick={editMode}>{'Save'}</button>
            <button onClick={erase}>Remove</button>
          </div>
        </div>
      ) : (
        <div className="tile-box">
          <div className="tile-box__inner tile-box__title">{title}</div>
          <div className="tile-box__inner tile-box__content">{content}</div>
          <div className="tile-box__inner tile-box__time">{time}</div>
          <div className="tile-box__inner tile-buttons">
            <button onClick={editMode}>{'Edit'}</button>
            <button onClick={erase}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tile;
