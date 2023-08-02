import type { NextPage } from 'next';
import React, { useState, useEffect, useMemo } from 'react';

import Tile from '../components/tile';
import { v4 as uuidv4 } from 'uuid';

export type Idea = {
  title: string;
  content: string;
  date: string;
  id: string;
};

const Home: NextPage = () => {
  const initialList: Idea[] = useMemo(() => [], []);
  const [ideas, setIdeas] = useState<Idea[]>(initialList);

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas');
    const savedList: Idea[] = storedIdeas ? JSON.parse(storedIdeas) : [];
    if (savedList.length > 0) {
      setIdeas(savedList);
    }
  }, []);

  useEffect(() => {
    if (ideas !== initialList) {
      localStorage.setItem('ideas', JSON.stringify(ideas));
    }
  }, [ideas, initialList]);

  const addOne = (): void => {
    let uuid = uuidv4();
    const newCard = {
      title: 'title',
      content: 'content',
      date: new Date().toLocaleString(),
      id: uuid,
    };

    setIdeas([...ideas, newCard]);
  };

  const editCard = (updatedCard: Idea): void => {
    const updatedCardInPlace = ideas.reduce(
      (accumulator: Idea[], current: Idea) => {
        if (updatedCard.id !== current.id) {
          return [...accumulator, current];
        }
        return [...accumulator, updatedCard];
      },
      []
    );

    setIdeas(updatedCardInPlace);
  };

  const sorting = (array: Idea[], property: keyof Idea): void => {
    const sorted = [...array].sort((a, b) => {
      if (a[property] > b[property]) return 1;
      if (a[property] < b[property]) return -1;
      return 0;
    });
    setIdeas(sorted);
  };

  const sortName = () => {
    sorting(ideas, 'title');
  };

  const sortDate = () => {
    sorting(ideas, 'date');
  };

  const removeOne = (selected: Idea) => {
    setIdeas(
      ideas.filter((ideasElement: Idea) => ideasElement.id !== selected.id)
    );
  };

  return (
    <div>
      <header>
        <h1>My Idea Board</h1>
      </header>
      <div className="button-block">
        <button onClick={addOne}>Add New Idea</button>
        <button onClick={sortName}>Sort by Name</button>
        <button onClick={sortDate}>Sort by Date</button>
      </div>
      {/* <div className="board"> */}
      <div className="board__big">
        {ideas.map((item) => {
          return (
            <span key={item.id}>
              <Tile card={item} cancel={removeOne} editCard={editCard} />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
