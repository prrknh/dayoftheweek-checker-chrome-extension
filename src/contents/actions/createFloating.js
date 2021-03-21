import { JSFrame } from "jsframe.js";

export default function createModal(text) {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: "Result Of Check day of the week",
    left: 20,
    top: 20,
    width: 320,
    height: 100,
    appearanceName: "popup",
    style: {
      backgroundColor: "rgba(220,220,220,0.8)",
    },
    html: `<div style="padding:10px;font-size:12px;">${text}</div>`,
  });
  frame.show();
}
