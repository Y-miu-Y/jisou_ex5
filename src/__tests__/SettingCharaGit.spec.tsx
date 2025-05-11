import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SettingCharaGit } from "../Pages/SettingCharaGit";
import userEvent from "@testing-library/user-event";
import { isExistDBGitId, registCharaGit } from "../services/CharaGItService";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../services/CharaGItService", () =>({
  registCharaGit: jest.fn(),
  isExistDBGitId: jest.fn()
}));
jest.mock("../utils/urlUtils");

const AllProviders = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>
    <MemoryRouter initialEntries={["/test"]}>
      {children}
    </MemoryRouter>
  </ChakraProvider>
);

describe('UserCharaGitのテスト', () => {
  describe('描画テスト', () => {
    it('タイトルが表示される', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<SettingCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      expect(await screen.findByTestId("title")).toHaveTextContent('Gitキャラ設定入力');
    });

    it('GithubIDが表示される', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<SettingCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      expect(await screen.findByTestId("githubId")).toHaveTextContent('test');
    });
  });

  describe('機能テスト', () => {
    it('キャラの名前を入力できる', async() => {
      render(
        <Routes>
          <Route path="/:id" element={<SettingCharaGit />}/>
        </Routes>,
        { wrapper: AllProviders }
      );
      const input = await screen.findByTestId("inputName");
      await userEvent.type(input, "かわいい子");
      expect(input).toHaveValue('かわいい子');
    });

    describe('キャラの性格を選択できる', () => {
      it('かっこいい', async() => {
        const content = render(
          <Routes>
            <Route path="/:id" element={<SettingCharaGit />}/>
          </Routes>,
          { wrapper: AllProviders }
        );
        const select = await content.findByTestId("selectCool");
        const radio = select.previousElementSibling;
        expect(radio).toBeChecked();
        const cute = await content.findByTestId("selectCute");
        await userEvent.click(cute);
        expect(radio).not.toBeChecked();
        await userEvent.click(select);
        expect(radio).toBeChecked();
      });
      it('かわいい', async() => {
        const content = render(
          <Routes>
            <Route path="/:id" element={<SettingCharaGit />}/>
          </Routes>,
          { wrapper: AllProviders }
        );
        const cute = await content.findByTestId("selectCute");
        const radio = cute.previousElementSibling;
        expect(radio).not.toBeChecked();
        await userEvent.click(cute);
        expect(radio).toBeChecked();
      });
      it('ぼんやり', async() => {
        const content = render(
          <Routes>
            <Route path="/:id" element={<SettingCharaGit />}/>
          </Routes>,
          { wrapper: AllProviders }
        );
        const poor = await content.findByTestId("selectPoor");
        const radio = poor.previousElementSibling;
        expect(radio).not.toBeChecked();
        await userEvent.click(poor);
        expect(radio).toBeChecked();
      });
      it('ふしぎ', async() => {
        const content = render(
          <Routes>
            <Route path="/:id" element={<SettingCharaGit />}/>
          </Routes>,
          { wrapper: AllProviders }
        );
        const philo = await content.findByTestId("selectPhilosophy");
        const radio = philo.previousElementSibling;
        expect(radio).not.toBeChecked();
        await userEvent.click(philo);
        expect(radio).toBeChecked();
      });
    });
  });

  it('キャラの名前・性格をdbに登録できる', async() => {
    const mockNav = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNav);
    (isExistDBGitId as jest.Mock).mockResolvedValue(false);
    const content = render(
      <Routes>
        <Route path="/:id" element={<SettingCharaGit />}/>
      </Routes>,
      { wrapper: AllProviders }
    );
    const input = await screen.findByTestId("inputName");
    await userEvent.type(input, "かわいい子");
    expect(input).toHaveValue('かわいい子');
    await userEvent.click(await content.findByTestId("submit"));
    const registState = {
      git_id: "test",
      name: "かわいい子",
      character: "cool"
    }
    expect(registCharaGit).toHaveBeenCalledWith(registState);
    expect(mockNav).toHaveBeenCalledWith("/test");
  });
});