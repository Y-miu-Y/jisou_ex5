import { render, screen } from "@testing-library/react";
import { InitCharaGit } from "../Pages/InitCharaGit";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { checkUserExists } from "../utils/urlUtils";
import { isExistDBGitId } from "../services/CharaGItService";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../services/CharaGItService");
jest.mock("../utils/urlUtils");

describe('UserCharaGitのテスト', () => {
  describe('描画テスト', () => {
    it('タイトルが表示されている', async() => {
      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
        
      );
      
      expect(await screen.findByTestId("title")).toHaveTextContent('Gitキャラ育成ゲーム');
    });
  });

  describe('機能テスト',() => {
    it('GithubIDの未入力エラーを確認する', async() => {
      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
        
      );


      const inputForm = await screen.findByTestId("input");
      expect(inputForm).toHaveValue("");

      const submitButton = await screen.findByTestId("submit");
      await userEvent.click(submitButton);
      
      expect(await screen.findByTestId("errormsg")).toHaveTextContent('入力されていません。');

    });

    it('GithubIDが存在しないエラーを確認する', async() => {

      (checkUserExists as jest.Mock).mockResolvedValue(false);

      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
        
      );


      const inputForm = await screen.findByTestId("input");
      await userEvent.type(inputForm, "test");
      expect(inputForm).toHaveValue("test");

      const submitButton = await screen.findByTestId("submit");
      await userEvent.click(submitButton);
      
      expect(await screen.findByTestId("errormsg")).toHaveTextContent('ユーザーが存在しません');
      
    });
    
    it('GithubIDが存在してDB登録済みの場合、localhost:5132/:idに遷移する', async() => {
      const mockNav = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(mockNav);
      (checkUserExists as jest.Mock).mockResolvedValue(true);
      (isExistDBGitId as jest.Mock).mockResolvedValue(true);
      
      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
      );

      const inputForm = await screen.findByTestId("input");
      await userEvent.type(inputForm, "test");
      expect(inputForm).toHaveValue("test");

      const submitButton = await screen.findByTestId("submit");
      await userEvent.click(submitButton);
      
      expect(mockNav).toHaveBeenCalledWith("test");
    });

    it('GithubIDが存在してDB未登録の場合、localhost:5132/:id/settingに遷移する', async() => {
      const mockNav = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(mockNav);
      (checkUserExists as jest.Mock).mockResolvedValue(true);
      (isExistDBGitId as jest.Mock).mockResolvedValue(false);
      
      render(
        <MemoryRouter>
          <InitCharaGit />
        </MemoryRouter>
      );

      const inputForm = await screen.findByTestId("input");
      await userEvent.type(inputForm, "test");
      expect(inputForm).toHaveValue("test");

      const submitButton = await screen.findByTestId("submit");
      await userEvent.click(submitButton);
      
      expect(mockNav).toHaveBeenCalledWith("test/setting");
    });
  });
});

