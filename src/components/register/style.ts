import styled from "styled-components";

export const DivRegister = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
height: 100vh;
.voltar {
    margin-left: 17em;
}

.BtnSalvar {
    margin: 3% 0;
    width: 93%;
}
label {
    margin-right: 12em;
}
.inputText {
width: 20em;
height: 2em;
border-radius: 4px;
border:none;
padding:1% 1%;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); 
}
.selectInput{
    height: 2em;
}
.selectMenor{
    width: 8em;
    height: 2em;
}
.selectSeries{
    width: 5em;
    height: 2em;
}
`
export const DivBtns = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction:row;

`

export const DivInputs = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row ;
width: 100%;
margin: 0;
padding: 0;
margin: 5% 0;
`
