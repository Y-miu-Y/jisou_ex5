import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { InitCharaGit } from "../Pages/InitCharaGit";

describe('UserCharaGitのテスト', () => {
  describe('描画テスト', () => {
    it('タイトルが表示されている', async() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<InitCharaGit />} />
          </Routes>
        </MemoryRouter>
      );
      expect(await screen.findByTestId("title"));
    });
  });
});

