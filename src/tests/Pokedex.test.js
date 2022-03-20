import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(titulo).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const botao = screen.getByTestId('next-pokemon');
    expect(botao).toBeInTheDocument();
    userEvent.click(botao);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(botao);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(botao);
    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();

    userEvent.click(botao);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    userEvent.click(botao);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(botao);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(botao);
    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();

    userEvent.click(botao);
    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();

    userEvent.click(botao);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuName && pikachuWeight).toBeInTheDocument();

    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(botao).toBeInTheDocument();
    userEvent.click(botao);

    const charmanderName = screen.getByText(/charmander/i);
    const charmanderWeight = screen.getByText(/average weight: 8\.5 kg/i);
    expect(charmanderName && charmanderWeight).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const botaoElectric = screen.getByRole('button', { name: /electric/i });
    expect(botaoElectric).toBeInTheDocument();

    const botaoFire = screen.getByRole('button', { name: /fire/i });
    expect(botaoFire).toBeInTheDocument();

    const botaoBug = screen.getByRole('button', { name: /bug/i });
    expect(botaoBug).toBeInTheDocument();

    const botaoPoison = screen.getByRole('button', { name: /poison/i });
    expect(botaoPoison).toBeInTheDocument();

    const botaoPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(botaoPsychic).toBeInTheDocument();

    const botaoNormal = screen.getByRole('button', { name: /normal/i });
    expect(botaoNormal).toBeInTheDocument();

    const botaoDragon = screen.getByRole('button', { name: /dragon/i });
    expect(botaoDragon).toBeInTheDocument();

    const botaoAll = screen.getByRole('button', { name: /all/i });
    expect(botaoAll).toBeInTheDocument();

    userEvent.click(botaoDragon);
    const dragonairName = screen.getByText(/dragonair/i);
    expect(dragonairName && botaoAll).toBeInTheDocument();

    const BOTOES = 7;
    const botoesTipo = screen.getAllByTestId('pokemon-type-button');
    expect(botoesTipo).toHaveLength(BOTOES);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botaoAll = screen.getByRole('button', { name: /all/i });
    expect(botaoAll).toBeInTheDocument();

    userEvent.click(botaoAll);
    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();
  });
});
