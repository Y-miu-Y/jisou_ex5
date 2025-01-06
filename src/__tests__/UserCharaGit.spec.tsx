import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserCharaGit } from "../Pages/UserCharaGit";

jest.mock("../services/CharaGItService", () =>({
  registCharaGit: jest.fn(),
  isExistDBGitId: jest.fn().mockResolvedValue(true),
  selectCharaGit: jest.fn()
}));
jest.mock("../utils/urlUtils");

describe('キャラ画面のテスト',() => {
  describe('描画テスト',() => {

    it('キャラの画像が表示される', async() => {
      render(
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/:id" element={<UserCharaGit />}/>
          </Routes>
        </MemoryRouter>
      );
      
      expect(await screen.findByTestId("charaImg")).toBeInTheDocument();
    });

    it('キャラの吹き出しが表示される', async() => {
      render(
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/:id" element={<UserCharaGit />}/>
          </Routes>
        </MemoryRouter>
      );
      
      expect(await screen.findByTestId("commentBox")).toBeTruthy();
    });

    it('吹き出しにあいさつが表示される', async() => {
      render(
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/:id" element={<UserCharaGit />}/>
          </Routes>
        </MemoryRouter>
      );
      
      expect(await screen.findByTestId("comment")).toBeInTheDocument();
    });
  });

  describe('機能テスト',() => {
  
  });
});