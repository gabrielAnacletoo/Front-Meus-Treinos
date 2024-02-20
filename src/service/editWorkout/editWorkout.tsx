import axios, { AxiosError } from "axios";

export const FindAllWorkouts = async (token: string) => {
  const url = "https://myworkouts.onrender.com//workouts";

  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    if (response.status === 200) {
      // Retorno para status 201 (Created)
      return { success: true, data: response.data };
    } else if (response.status === 400) {
      return {
        success: false,
        message: `Algo deu errado, Tente novamente.`,
      };

  }  else {
          console.log('response',response)

      // Se a resposta não for 201, lançamos um erro
      throw new Error(`Erro inesperado: ${response.status}`);
    }
  } catch (error) {
    // Tratamento de erros
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
         if (axiosError.response.status === 404) {
          // Retorno para status 404 (Not Found)
          return {
            success: false,
            message: "Recurso não encontrado. Verifique a URL.",
          };
        } else if (axiosError.response.status === 500) {
          // Retorno para status 500 (Internal Server Error)
          return {
            success: false,
            message: "Erro interno do servidor. Tente novamente mais tarde.",
          };
        }
      }

      // Se não houver resposta, tratamos outros erros genéricos
      return {
        success: false,
        message: "Erro durante a requisição. Tente novamente mais tarde.",
      };
    }
  }
};

