import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome && linkAbout && linkFavoritePokemons).toBeInTheDocument();
  });

  it('Testa se a aplicação vai para a página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação vai para a página About, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação vai para a página Favorite, ao clicar em seu link', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokemons).toBeInTheDocument();
    userEvent.click(linkFavoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Testa se a aplicaçãoacessa a página Not Found com uma URL invalida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/lala/lalala/lalaland');

    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
