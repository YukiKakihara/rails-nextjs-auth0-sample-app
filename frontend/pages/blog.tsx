import axios from 'axios';
import { NextPage } from 'next';
import React, { useState } from 'react';
// recoil
import { atom, useRecoilValue } from 'recoil';

const tokenState = atom({
  key: 'tokenState',
  default: '',
});

const BlogPage: NextPage = () => {
  const token = useRecoilValue(tokenState);

  const [title, setTitle] = useState<string>('');
  const [caption, setCaption] = useState<string>('');

  const onClick = () => {
    const params = {
      title: title,
      caption: caption,
    };
    console.log(token);

    axios
      .post('http://localhost:3000/api/v1/posts', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <div>
      <label htmlFor="">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e, setTitle);
        }}
      />
      <br />
      <label htmlFor="">本文</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => {
          onChange(e, setCaption);
        }}
      />
      <br />
      <button onClick={onClick}>新規投稿</button>
    </div>
  );
};

export default BlogPage;
