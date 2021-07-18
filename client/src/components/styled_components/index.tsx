import styled from "styled-components";
const svg = (
  <svg xmlns="http://www.w3.org/2000/svg"
     width="150" height="100" viewBox="0 0 3 2">

  <rect width="1" height="2" x="0" fill="#008d46" />
  <rect width="1" height="2" x="1" fill="#ffffff" />
  <rect width="1" height="2" x="2" fill="#d2232c" />
</svg>
);
let ancho=0
let alto=0

if(svg.props.width&&svg.props.height) {
ancho=svg.props.width
alto=svg.props.height
}

else  [ancho, alto] = svg.props.viewBox.split(" ").splice(2, 2);


export const BeeryButton = ({
  size = 100,
  labelFontSize = 100,
  labelMargin = "0",
  labelText = "Complete the prop 'labelText' to see your messagge here, the other propertys are: 'size', 'labelFonSize' and 'labelMargin'",
}) => {
  //Saco el tamaño del svg
  //aumento o achico segun lo pasado por props en size (si pasan 1 renderiza lo natural)
  ancho *= size / 100;
  alto *= size / 100;

  if (
    labelText ===
    "Complete the prop 'labelText' to see your messagge here, the other propertys are: 'size', 'labelFonSize' and 'labelMargin'"
  ) {
    labelFontSize = 24;
    labelMargin = "10% 10% 10% 10%";
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: ancho,
          height: alto,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontSize: `${(labelFontSize * ancho) / 400}px`,
            zIndex: 1,
            margin: labelMargin,
          }}
        >
          {labelText}
        </div>

        {svg}
      </div>
    </>
  );
};
