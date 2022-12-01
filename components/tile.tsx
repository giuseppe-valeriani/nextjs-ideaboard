import React, { useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
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
      <Container className="my-3">
        {edit ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={getTitle}
              className="input-group-text"
              aria-label="Title"
            />
            <input
              type="text"
              value={content}
              onChange={getContent}
              className="input-group-text"
              aria-label="Content"
              maxLength={140}
            />
            <div className="error">{error}</div>
          </div>
        ) : (
          <Card
            style={{
              minWidth: '150px',
              minHeight: '100px',
            }}
          >
            <Card.Header className="card-title">{title}</Card.Header>
            <Card.Body>{content}</Card.Body>
            <Card.Footer>{time}</Card.Footer>
          </Card>
        )}
      </Container>
      <div>
        <Button size="sm" onClick={editMode}>
          {edit ? 'Save' : 'Edit'}
        </Button>
        <Button size="sm" variant="danger" onClick={erase}>
          Remove
        </Button>
      </div>
    </>
  );
};

export default Tile;
