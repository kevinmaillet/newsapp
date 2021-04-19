import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Article from '../Article';

let container: Element | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it('renders with all fields', () => {
  if (container) {
    act(() => {
      render(
        <Article
          url="https://www.tests.com/newArticle"
          title="A new Test arrives!"
          image="https://www.tests.com/images/fdgdfdfg.jpg"
          description="a new test description arrives"
          publishedAt={new Date()}
          source={{ name: 'Tester', url: 'https://www.tests.com' }}
        />,
        container
      );
    });
    expect(container.querySelector('.article__title')?.textContent).toBe(
      'A new Test arrives! - Tester'
    );
  }
});
