# FIA Secure Archive

一个可部署到 GitHub Pages 的纯静态交互页面。

## 当前流程

- 第一屏为 `FIA Secure Archive` 企业化访问终端。
- 正确访问码为 `Interlinked`。
- 验证通过后显示 `ACCESS GRANTED` 和 `LOADING...`，随后进入系统日志异常。
- 玩家输入姓名后，页面会在后续文本中使用该名字。
- 选择 `YES` 会触发 `WARNING` 并结束。
- 选择 `NO` 后进入三道选择题。
- 任意题答错会黑屏结束。
- 全部答对后进入白光最终结局和作者留言。

## 本地预览

直接用浏览器打开 `index.html` 即可。

如果想用本地服务器预览，可以在项目目录运行：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 部署到 GitHub Pages

1. 把这个目录提交并推送到 GitHub 仓库。
2. 打开仓库的 `Settings`。
3. 进入 `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub 生成网站地址。

项目是纯 HTML/CSS/JavaScript，不需要构建步骤。
