import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const ROTA = '/pokemons/25';
describe('Testando o componente Pokemon Details', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /more details/i });
    expect(linkDetalhes).toBeInTheDocument();

    userEvent.click(linkDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe(ROTA);

    const titulo = screen.getByRole('heading', { name: /pikachu details/i });
    expect(titulo).toBeInTheDocument();
    expect(linkDetalhes).not.toBeInTheDocument();

    const resumo = screen.getByRole('heading', { name: /summary/i });
    expect(resumo).toBeInTheDocument();

    const paragrafo = screen.getByText(
      /this intelligent pokémon roasts hard berries/i,
    );
    expect(paragrafo).toBeInTheDocument();
  });

  it('Testa se existe os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(ROTA);

    const tituloMapa = screen.getByRole('heading',
      { name: /game locations of pikachu/i });
    expect(tituloMapa).toBeInTheDocument();

    const imagemUm = screen.getAllByRole('img', { name: /pikachu location/i })[0];
    const imagemDois = screen.getAllByRole('img', { name: /pikachu location/i })[1];
    expect(imagemUm && imagemDois).toBeInTheDocument();

    const localizacaoUm = screen.getByText(/kanto viridian forest/i);
    const localizacaoDois = screen.getByText(/kanto power plant/i);
    expect(localizacaoUm && localizacaoDois).toBeInTheDocument();

    expect(imagemUm.src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagemDois.src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(ROTA);

    const pokemonFavoritado = screen.getByRole('checkbox',
      { name: /Pokémon favoritado/i });
    expect(pokemonFavoritado).toBeInTheDocument();
    userEvent.click(pokemonFavoritado);

    history.push('/favorites');
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    history.push(ROTA);
    userEvent.click(pokemonFavoritado);

    history.push('/favorites');
    expect(pikachu).not.toBeInTheDocument();
  });
});
