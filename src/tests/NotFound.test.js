import React from 'react';
import { screen } from '@testing-library/react';
//  import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Not Found', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/lala/lalala/lalaland');

    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/lala/lalala/lalaland');
    const { getByAltText } = renderWithRouter(<App />);

    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
