import { render, screen } from "@testing-library/react";
import { InitCharaGit } from "../Pages/InitCharaGit";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe('UserCharaGitのテスト', () => {
  describe('描画テスト', () => {
    it('タイトルが表示されている', async() => {
      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
        
      );
      expect(await screen.findByTestId("title"));
    });
  });

  describe('機能テスト',() => {
    
  });
});

