import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../service/auth/auth";
import { useState, ChangeEvent, useEffect } from "react";
import { loginPayload } from "../../config/types/types";
import * as D from './style'


export const Login = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState<boolean>(false); 
  const [rememberedEmail, setRememberedEmail] = useState<string>(""); 
  const [rememberedPassword, setRememberedPassword] = useState<string>(""); 
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState<loginPayload>({
    email: "",
    password: "",
  });

  // INPUTS
  // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setData((prevdata) => ({
  //     ...prevdata,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const AuthResult = await Auth(Data);
      console.log(AuthResult);

      if (AuthResult) {
        localStorage.setItem("TOKEN", AuthResult.token);
        navigate("/start");
      }
    } catch (error) {
      setLoading(false);
      //setErrorMessage(ERROR_MESSAGE_GENERIC);
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

 /* ==========================  LEMBRAR SENHA ============================== */
 const handleRemember = (e: ChangeEvent<HTMLInputElement>) => {
  setRemember(e.target.checked);
}

useEffect(() => {
  const rememberedEmail = localStorage.getItem("REMEMBERED_EMAIL");
  const rememberedPassword = localStorage.getItem("REMEMBERED_PASSWORD");

  if (rememberedEmail && rememberedPassword) {
    setRememberedEmail(rememberedEmail);
    setRememberedPassword(rememberedPassword);
    setData({
      email: rememberedEmail,
      password: rememberedPassword
    });

  } else {
    // Definir os valores padrão dos inputs apenas se não houver informações lembradas
    setRememberedEmail("");
    setRememberedPassword("");
  }
}, []);

useEffect(() => {
  if (remember) {
    localStorage.setItem("REMEMBERED_EMAIL", rememberedEmail);
    localStorage.setItem("REMEMBERED_PASSWORD", rememberedPassword);
  }
}, [remember, rememberedEmail, rememberedPassword]);
  
  return (
    <>
      <D.DivLogin>
        <label htmlFor="email">Email</label>
        <input
        className="inputText"
          type="email"
          placeholder="seu email"
          name="email"
          value={rememberedEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberedEmail(e.target.value)}
          required
        />

        <label htmlFor="">Senha</label>
        <input
        className="inputText"
          type="password"
          placeholder="sua senha"
          name="password"
          required
          value={rememberedPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberedPassword(e.target.value)}
        />

        <br />
        <D.LabelRemeber>
                Lembrar-me
                <input
                className="inputBox"
                  type="checkbox"
                  checked={remember}
                  onChange={handleRemember}
                />
              </D.LabelRemeber>
              <br />
        <Button className="rounded-0 shadow Btns" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Entrar"}
        </Button>

        <Button className="rounded-0 shadow Btns">Registrar</Button>
        <br />
      </D.DivLogin>
    </>
  );
};
