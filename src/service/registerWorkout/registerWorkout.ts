import axios, { AxiosError } from "axios";
import { WorkoutInterface } from "../../config/types/types";

export const RegisterWorkout = async (token: string, workout: WorkoutInterface) => {
  const url = "https://myworkouts.onrender.com/workouts";

  try {
    const response = await axios.post(url, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    if (response.status === 201) {
      // Retorno para status 201 (Created)
      return { success: true, data: response.data };
    } else if (response.status === 400) {
      return {
        success: false,
        message: `Já existe um treino para ${workout.dayOfWeek}.`,
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
        if (axiosError.response.status === 400) {
          // Retorno para status 400 (Bad Request)
          return {
            success: false,
            message: `Já existe um treino para ${workout.dayOfWeek}.`,
          };
        } else if (axiosError.response.status === 404) {
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

