import React from 'react';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <h1>
      Hello!{' '}
      <span role="img" aria-label="waving hand">
        👋
      </span>
    </h1>
    <p>
      My name is Spencer Aung. I am a JavaScript developer at{' '}
      <a
        href="https://www.korbit.co.kr"
        target="_blank"
        rel="noreferrer noopener"
      >
        Korbit.
      </a>
    </p>
    <p>
      I work from home and enjoy life with{' '}
      <a
        href="https://www.instagram.com/mr__garu/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Mr. Garu
      </a>
      , my favorite cat in the whole world. When I am not making apps, I am
      either on Netflix or reading a book.
    </p>
    <h3>2019 Missions</h3>
    <ul>
      <li>Improve Functional Programming skill</li>
      <li>Walk at least 5 km a day</li>
      <li>Make a product prototype</li>
      <li>Learn Korean</li>
    </ul>
    <h3>Reach me at</h3>
    <p>
      <a href="mailto:aung.spencer@gmail.com">
        <span role="img" aria-label="email icon">
          📧
        </span>{' '}
        aung.spencer@gmail.com
      </a>
    </p>
  </Layout>
);

export default IndexPage;
