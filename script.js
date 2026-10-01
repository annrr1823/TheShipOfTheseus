const scenes = {
  start: {
    eyebrow: "第一块木板",
    title: "你在一片黑暗中醒来。",
    text: "远处有字慢慢浮现，像潮水退去后露出的船骨。你意识到，这艘船正在等待你决定它是谁。",
    choices: [
      { label: "触碰那行字", next: "touch" },
      { label: "继续保持沉默", next: "silence" },
    ],
  },
  touch: {
    eyebrow: "白字发亮",
    title: "你的指尖穿过了文字。",
    text: "黑暗像水一样裂开。你看见甲板上有一块腐朽的木板，也有一块崭新的木板。",
    choices: [
      { label: "换上新木板", next: "replace" },
      { label: "留下旧木板", next: "keep" },
    ],
  },
  silence: {
    eyebrow: "无声之海",
    title: "黑暗没有离开。",
    text: "但字变得更多了。它们不再问你要做什么，而是问你：如果没有人选择，改变是否仍然发生？",
    choices: [
      { label: "承认它会发生", next: "drift" },
      { label: "否认它的发生", next: "deny" },
    ],
  },
  replace: {
    eyebrow: "第二块木板",
    title: "船轻了一点。",
    text: "新木板没有记忆，却比旧木板更适合航行。你听见船身深处传来陌生的心跳。",
    choices: [
      { label: "继续替换", next: "many" },
      { label: "回头寻找旧木板", next: "old" },
    ],
  },
  keep: {
    eyebrow: "潮湿旧痕",
    title: "船沉了一点。",
    text: "旧木板保留了裂纹、盐霜和名字。它不再可靠，却仍然证明这艘船曾经来过这里。",
    choices: [
      { label: "为裂纹命名", next: "name" },
      { label: "把名字擦掉", next: "erase" },
    ],
  },
  drift: {
    eyebrow: "自动航行",
    title: "船自己换了一块木板。",
    text: "你没有动手，但世界仍然替你做出了选择。你开始怀疑自己到底是船长，还是甲板上的另一块木头。",
    choices: [
      { label: "夺回船舵", next: "helm" },
      { label: "让它继续漂流", next: "sea" },
    ],
  },
  deny: {
    eyebrow: "拒绝记录",
    title: "文字短暂消失。",
    text: "黑暗变得完整。可当你眨眼时，原本空白的地方多了一道划痕，像有人替你写下了否认。",
    choices: [
      { label: "读那道划痕", next: "scratch" },
      { label: "闭上眼睛", next: "start" },
    ],
  },
  many: {
    eyebrow: "崭新的船",
    title: "最后一块旧木板也被换下。",
    text: "船比任何时候都完整，也比任何时候都陌生。它问你：完整，是不是另一种失去？",
    choices: [
      { label: "回答是", next: "yes" },
      { label: "回答不是", next: "no" },
    ],
  },
  old: {
    eyebrow: "岸边残骸",
    title: "旧木板堆成了另一艘船。",
    text: "它破旧、沉重、几乎不能出海。但当你靠近时，它喊出了你的名字。",
    choices: [
      { label: "登上旧船", next: "memory" },
      { label: "回到新船", next: "many" },
    ],
  },
  name: {
    eyebrow: "裂纹的名字",
    title: "你把伤痕叫作航线。",
    text: "每一道裂纹都亮起微弱的白光。船没有变得更坚固，却变得更容易被认出。",
    choices: [
      { label: "继续航行", next: "memory" },
      { label: "重新开始", next: "start" },
    ],
  },
  erase: {
    eyebrow: "空白甲板",
    title: "名字被擦掉后，木板仍在。",
    text: "你发现遗忘不是删除，而是让证据失去声音。黑暗里只剩下船桨划水的节奏。",
    choices: [
      { label: "跟着节奏走", next: "sea" },
      { label: "重新开始", next: "start" },
    ],
  },
  helm: {
    eyebrow: "船舵",
    title: "你握住了方向。",
    text: "船没有立刻听话。它先记住你的手温，然后才把海面一点点转向白光。",
    choices: [
      { label: "驶向白光", next: "yes" },
      { label: "驶回黑暗", next: "scratch" },
    ],
  },
  sea: {
    eyebrow: "无岸",
    title: "海面复制了天空。",
    text: "上下都是黑色，星星像未完成的句子。你终于明白，有些选择不会结束故事，只会改变讲述它的声音。",
    choices: [
      { label: "换一种声音", next: "start" },
      { label: "留在这里", next: "ending" },
    ],
  },
  scratch: {
    eyebrow: "划痕",
    title: "划痕其实是一扇门。",
    text: "门后没有答案，只有另一片黑暗。不同的是，这一次，黑暗在等你先开口。",
    choices: [
      { label: "说出我是这艘船", next: "yes" },
      { label: "说出我不是这艘船", next: "no" },
    ],
  },
  memory: {
    eyebrow: "记忆之船",
    title: "你登上了一艘不适合远行的船。",
    text: "它慢，吱呀作响，却知道每一阵风从哪里来。你不确定它是否还是原来的船，但它确实认得回家的路。",
    choices: [
      { label: "回家", next: "ending" },
      { label: "重新开始", next: "start" },
    ],
  },
  yes: {
    eyebrow: "回答",
    title: "是。",
    text: "白字像雪一样落下。它们覆盖船身，也覆盖你。你们都不再是最初的样子，但仍然在同一片海上。",
    choices: [
      { label: "再经历一次", next: "start" },
      { label: "停在此刻", next: "ending" },
    ],
  },
  no: {
    eyebrow: "回答",
    title: "不是。",
    text: "黑暗向后退去一步。你看见改变并没有偷走船，只是让船拥有了更多时间。",
    choices: [
      { label: "再经历一次", next: "start" },
      { label: "停在此刻", next: "ending" },
    ],
  },
  ending: {
    eyebrow: "暂时的岸",
    title: "页面安静下来。",
    text: "故事没有真正结束。下一次点击，黑暗会再次升起，字也会再次浮现。",
    choices: [{ label: "回到黑暗", next: "start" }],
  },
};

const sceneElement = document.querySelector("#scene");
const eyebrowElement = document.querySelector("#eyebrow");
const titleElement = document.querySelector("#title");
const textElement = document.querySelector("#text");
const choicesElement = document.querySelector("#choices");

let activeScene = "start";

function renderScene(sceneId) {
  const scene = scenes[sceneId] ?? scenes.start;
  activeScene = sceneId;

  sceneElement.classList.remove("is-visible");

  window.setTimeout(() => {
    eyebrowElement.textContent = scene.eyebrow;
    titleElement.textContent = scene.title;
    textElement.textContent = scene.text;
    choicesElement.replaceChildren(
      ...scene.choices.map((choice) => {
        const button = document.createElement("button");
        button.className = "choice";
        button.type = "button";
        button.textContent = choice.label;
        button.addEventListener("click", () => renderScene(choice.next));
        return button;
      }),
    );

    document.body.dataset.scene = activeScene;
    sceneElement.classList.add("is-visible");
  }, 550);
}

document.addEventListener("pointermove", (event) => {
  const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`;
  const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`;

  document.body.style.setProperty("--x", x);
  document.body.style.setProperty("--y", y);
});

renderScene(activeScene);
