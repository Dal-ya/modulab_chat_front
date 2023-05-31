import AuthorCard from './AuthorCard';
import React, { useState } from 'react';
import { PaintData } from '../lib/type';

const authorList = [
  {
    id: 1,
    name: '에드워드 호퍼',
    engName: 'Edward Hopper',
    desc: '미국의 사실주의 화가',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg',
    isActive: true,
  },
  {
    id: 2,
    name: '반 고흐',
    engName: 'Vincent van Gogh',
    desc: '네덜란드 출신의 탈인상주의 화가',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/VanGogh-starry_night.jpg',
    isActive: false,
  },
  {
    id: 3,
    name: '피카소',
    engName: 'Pablo Picasso',
    desc: '스페인 출신의 큐비즘 화가',
    img: 'https://upload.wikimedia.org/wikipedia/en/3/31/Pablo_Picasso%2C_1913%2C_Bouteille%2C_clarinette%2C_violon%2C_journal%2C_verre.jpg',
    isActive: false,
  },
];

const PaintForm = ({ onCreatePaint }: { onCreatePaint: (payload: PaintData) => void }) => {
  const [authors, setAuthors] = useState(authorList);
  const [description, setDescription] = useState('');

  const onAuthorCardClick = (id: number) => {
    const newAuthors = authors.map((author) => {
      if (author.id === id) {
        return { ...author, isActive: true };
      } else {
        return { ...author, isActive: false };
      }
    });
    setAuthors(newAuthors);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activeAuthor = authors.find((author) => author.isActive);

    if (activeAuthor) {
      onCreatePaint({
        author: activeAuthor.engName,
        description,
      });
    } else {
      alert('작가를 선택해주세요!');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap justify-between">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              onClick={() => {
                onAuthorCardClick(author.id);
              }}
            />
          ))}
        </div>
        <div>
          <div>
            <label className="p-2">작가</label>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full max-w-xs"
            readOnly={true}
            value={authors.find((author) => author.isActive)?.name}
          />
          <div className="mt-4">
            <label className="p-2">내용</label>
          </div>
          <input
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            maxLength={100}
            placeholder="예) 고양이 한 마리가 카페 테라스에 앉아 있다."
            className="input w-full max-w-lg"
            required={true}
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-accent">
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaintForm;
