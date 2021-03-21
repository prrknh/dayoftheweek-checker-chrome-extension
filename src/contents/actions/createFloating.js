import { JSFrame } from "jsframe.js";

export default function createModal(text, lineCnt) {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: "Result Of Check day of the week",
    left: 20,
    top: 20,
    width: 270,
    height: 20 * (lineCnt + 1),
    appearanceName: "popup",
    style: {
      backgroundColor: "rgba(220,220,220,0.8)",
    },
    html: `<div style="padding:10px;font-size:12px;">${text}</div>`,
  });
  frame.show();
}
