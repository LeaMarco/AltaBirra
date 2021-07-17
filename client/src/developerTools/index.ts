import { connectAdvanced } from "react-redux";

interface IdeveloperTools {
    consoleInfo: boolean;
    showMargins: boolean;
}

console.log(21321)
export const developerTools = function ({ consoleInfo, showMargins }: IdeveloperTools) {

    if (consoleInfo) {
        const threeAndGrave = document.getElementById("root");
        console.log(threeAndGrave);

        let flag = false
        console.log("Presionar click derecho para encender el consoleInfo!")

        threeAndGrave?.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            flag = !flag
        }, false);



        threeAndGrave?.addEventListener("mouseover", (event: any) => {
            if (flag) {
                console.log("\n\n\n")
                console.log("〰〰〰〰〰〰〰〰〰〰〰🔴🟠🟡🟢🔵🟣🟤⚫🔘〰〰〰〰〰〰〰〰〰〰〰〰");

                console.log("> 🆔 >>>>>> Id >>>>>> ", event.target.id, event.target.id ? " 💡" : "No posee! 📭");
                console.log("> 🧾 >>> Classname >>", event.target.className, event.target.className ? " 💡" : "No posee! 📭");
                console.log("> 🎫 >>> TagName >>>", event.target.tagName, event.target.tagName ? " 💡" : "No posee! 📭");
                console.log("> 🎯 >>> OnClick >>>", event.target.onclick ? " 💡" : "No posee! 📭");
                console.log("> 👨‍👨‍👧‍👧 >>> ChildElementCount >>>", event.target.childElementCount, event.target.childElementCount ? " 💡" : "No posee! 📭");
                console.log(event.target)
                console.log("〰〰〰〰Click derecho para pausar y reiniciar de imprimir!〰〰〰〰");
            }
        }
        );
    }

    if (showMargins) {

        const a = document.getElementsByClassName("subcontainer")

        console.log(a)

        for (let i in a) {
            console.log(a[i])
            // a[i] && a[i].style && a[i].style.margin ? console.log("entre") : ""
        }





    }



}


