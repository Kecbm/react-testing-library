import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Favorite Pokemons', () => {
  it('Testa se é exibido No favorite pokemon found, se não tiver favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const FavoritePokemonsText = screen.getByText('No favorite pokemon found');

    expect(FavoritePokemonsText).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const pokemonFavoritado = screen.getByRole('checkbox',
      { name: /Pokémon favoritado/i });
    userEvent.click(pokemonFavoritado);

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritePokemons);

    expect(history.location.pathname).toBe('/favorites');

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
