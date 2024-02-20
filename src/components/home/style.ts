import styled from "styled-components";


export const DivHome = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;

`
export const DivMap = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100lvh;
.carousel-control-next-icon,
.carousel-control-prev-icon {
  fill: black; /* Define a cor preta para os ícones */
}
.carrousel {
    display:flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 25em;
    border: 1px solid dimgray;
    margin-bottom: 3%;
    p {
    text-align: center;
    }
}
`

export const DivImage = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
img {
  width: 22em;
  height: 15emm;
}
`