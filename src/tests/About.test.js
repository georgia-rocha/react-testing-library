import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testando componente About', () => {
  const infoAbout = {
    title: 'About Pokédex',
    p1: 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
    p2: 'One can filter Pokémon by type, and see more details for each one of them',
    img: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  };
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', async () => {
    renderWithRouter(<About />);

    const aboutText1 = await screen.findByText(infoAbout.p1);
    expect(aboutText1).toBeInTheDocument();

    const aboutText2 = await screen.findByText(infoAbout.p2);
    expect(aboutText2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', async () => {
    renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img', { name: 'Pokédex' });

    expect(aboutImg.src).toBe(infoAbout.img);
  });
});
