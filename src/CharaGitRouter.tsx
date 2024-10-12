import { BrowserRouter, Route, Routes } from "react-router-dom"
import { InitCharaGit } from "./Pages/InitCharaGit"
import { UserCharaGit } from "./Pages/UserCharaGit"
import { SettingCharaGit } from "./Pages/SettingCharaGit"

export const CharaGitRouter = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitCharaGit />}/>
          <Route path="/:id">
            <Route index element={<UserCharaGit />}/>
            <Route path="setting" element={<SettingCharaGit />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

