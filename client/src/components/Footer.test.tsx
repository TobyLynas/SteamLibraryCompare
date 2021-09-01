import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Footer from "./Footer";

it("renders footer correctly", async () => {
    const { findByText } = render(<Footer />);
    expect(
        await findByText('Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.')
    ).toBeVisible;
});

it("github logo links to project repo", async () => {
    const getByTitle = render(<Footer />);
    expect(screen.getByTitle('Find us on GitHub').closest('a')).toHaveAttribute('href', 'https://github.com/TobyLynas/SteamLibaryCompare')
});