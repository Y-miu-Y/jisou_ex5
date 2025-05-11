import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserCharaGit } from "../Pages/UserCharaGit";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

jest.mock("../services/CharaGItService", () =>({
  registCharaGit: jest.fn(),
  isExistDBGitId: jest.fn().mockResolvedValue(true),
  selectCharaGit: jest.fn()
}));
jest.mock("../utils/urlUtils");

const AllProviders = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>
    <MemoryRouter initialEntries={["/test"]}>
      {children}
    </MemoryRouter>
  </ChakraProvider>
);

describe('キャラ画面のテスト',() => {
  describe('描画テスト',() => {
    it('キャラの画像が表示される', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<UserCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      expect(await screen.findByTestId("charaImg")).toBeInTheDocument();
    });

    it('キャラの吹き出しが表示される', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<UserCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      expect(await screen.findByTestId("commentBox")).toBeTruthy();
    });

    it('吹き出しにあいさつが表示される', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<UserCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      expect(await screen.findByTestId("comment")).toBeInTheDocument();
    });
  });

  describe('機能テスト',() => {
  });
});