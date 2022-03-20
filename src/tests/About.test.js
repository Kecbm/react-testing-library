import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading',
      { name: 'About Pokédex' },
      { level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafoUm = screen.getByText('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
    const paragrafoDois = screen.getByText('One can filter Pokémons by type,'
      + ' and see more details for each one of them');

    expect(paragrafoUm && paragrafoDois).toBeInTheDocument();
  });

  it('Testa se a página contém uma imagem de Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imagem = getByAltText('Pokédex');
    expect(imagem.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
