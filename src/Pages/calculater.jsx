import "../CSS/App.css";
import Navbar from "./navbar";
import { useEffect } from "react";

function Calculator() {
  const removeSpace =(val) =>{
    if(val !== ""){
      return val
    }
  }
  const calculate = () => {
    const history = document.getElementById("history");
    const item = document.createElement("li");
    const operation = document.getElementById("display");
    let hist = JSON.parse(localStorage.getItem("calculateHistory") || "[]");

    let op_str = operation.value;
    let arr = [];
    let nb = "";

    op_str += "=";
    item.innerText = operation.value;
    history.appendChild(item);
    hist.push(operation.value);
    localStorage.setItem("calculateHistory", JSON.stringify(hist));

    for (let i = 0; i < op_str.length; i++) {
      if (
        op_str[i] === "+" ||
        op_str[i] === "-" ||
        op_str[i] === "/" ||
        op_str[i] === "*" ||
        op_str[i] === "%" ||
        op_str[i] === "="
      ) {
        arr.push(nb);
        arr.push(op_str[i]);
        nb = "";
      } else {
        nb += op_str[i];
      }
    }
    let ans = 0;
    arr = arr.filter(removeSpace)
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case "+":
          i++;
          ans += parseFloat(arr[i]);
          break;
        case "-":
          i++;
          ans -= parseFloat(arr[i]);
          break;
        case "/":          
        console.log(arr[i])
          i++;
          console.log(arr[i])
          if (arr[i] === "-") {
            i++;
            ans /= parseFloat(arr[i]);
            ans *= -1;
          } else {
            ans /= parseFloat(arr[i]);
          }
          break;
        case "*":
          i++;
          if (arr[i] === "-") {
            i++;
            ans *= parseFloat(arr[i]);
            ans *= -1;
          } else {
            ans *= parseFloat(arr[i]);
          }
          break;
        case "%":
          i++;
          if (arr[i] === "-") {
            i++;

            ans %= parseFloat(arr[i]);
            ans *= -1;
          } else {
            ans %= parseFloat(arr[i]);
          }
          break;
        case "=":
          break;
        default:
          ans = parseFloat(arr[i]);
          break;
      }
    }
    operation.value = ans;
  };
  const appendValue = (val) => {
    const operation = document.getElementById("display");
    if (val === "AC" || val === "C") {
      operation.value = "";
    } else {
      operation.value += val;
    }
  };
  const buttons = () => {
    const ops = ["AC", "%", "C", "/", "*", "-", "+", "00", "0", ".", "="];
    const nbs = [7, 8, 9, 4, 5, 6, 1, 2, 3];

    const display = document.getElementById("button_display");
    const sec = document.createElement("div");

    let index = 0;
    let count = 0;
    for (let i = 0; i <= 3; i++) {
      const btn = document.createElement("input");
      btn.type = "button";
      btn.value = ops[i];
      btn.name = ops[i];
      btn.onclick = () => {
        appendValue(btn.value);
      };
      sec.appendChild(btn);
      index++;
    }
    display.appendChild(sec);

    for (let j = 0; j < 3; j++) {
      const sec2 = document.createElement("div");
      let prev = count + 3;
      for (let i = count; i < prev; i++) {
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = nbs[i];
        btn.name = nbs[i];
        btn.onclick = () => {
          appendValue(btn.value);
        };
        sec2.appendChild(btn);
        count++;
      }
      const op = document.createElement("input");
      op.type = "button";
      op.value = ops[index];
      op.name = ops[index];
      op.onclick = () => {
        appendValue(op.value);
      };
      index++;
      sec2.appendChild(op);
      display.appendChild(sec2);
    }
    const sec3 = document.createElement("div");
    for (let i = index; i < ops.length - 1; i++) {
      const btn = document.createElement("input");
      btn.type = "button";
      btn.value = ops[i];
      btn.name = ops[i];
      btn.onclick = () => {
        appendValue(btn.value);
      };
      sec3.appendChild(btn);
    }
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = ops[ops.length - 1];
    btn.name = ops[ops.length - 1];
    btn.onclick = () => {
      calculate();
    };
    sec3.appendChild(btn);
    display.appendChild(sec3);
  };
  useEffect(() => {
    const hist = JSON.parse(localStorage.getItem("calculateHistory") || "[]");
    buttons();
    for (let i = 0; i < hist.length; i++) {
      const item = document.createElement("li");
      item.innerText = hist[i];
      document.getElementById("history").appendChild(item);
    }
  }, []);
  return (
    <div className="Calculator">
      <Navbar />
      <div className="float-container space-even mg-top">
        <div className="card history">
          <div className="card-body">
            <div className="card-header">History</div>
            <ul id="history"></ul>
          </div>
        </div>
        <div className="display">
          <input type="text" id="display" disabled />
          <div className="buttons" id="button_display"></div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
