import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType.textContent).toEqual('Electric');
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuName && pikachuType && pikachuWeight).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card do Pokémon contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();
  });

  it('Testa se o card do Pokémon contém um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();

    userEvent.click(linkDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const pokemonFavoritado = screen.getByRole('checkbox',
      { name: /Pokémon favoritado/i });
    userEvent.click(pokemonFavoritado);

    const estrela = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(estrela).toBeInTheDocument();
    expect(estrela.src).toContain('/star-icon.svg');
  });
});
