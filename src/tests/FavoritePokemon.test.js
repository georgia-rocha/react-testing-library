import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Testando a page FavoritePokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFoundText = screen.getByText(/No favorite pokémon found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetail = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetail).toBeInTheDocument();
    userEvent.click(linkMoreDetail);

    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    renderWithRouter(<FavoritePokemon />);

    const favoritePokeon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokeon);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
