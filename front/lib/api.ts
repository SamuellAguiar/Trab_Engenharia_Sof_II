const API_BASE_URL = "http://localhost:8081";

// Função genérica para fazer requisições
async function fetchData(endpoint: string, method = "GET", body?: any) {
     try {
          const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
               method,
               headers: {
                    "Content-Type": "application/json",
               },
               credentials: "include", // Para suportar autenticação se necessário
               body: body ? JSON.stringify(body) : null,
          });

          if (!response.ok) throw new Error(`Erro ao acessar ${endpoint}`);
          return await response.json();
     } catch (error) {
          console.error(`Erro ao buscar dados de ${endpoint}:`, error);
          return null;
     }
}

// Funções específicas para cada entidade
export const api = {
     getEquipamentos: () => fetchData("equipamentos"),
     getUsuarios: () => fetchData("usuarios"),
     getAlugueis: () => fetchData("alugueis"),
     criarUsuario: (usuario: any) => fetchData("usuarios", "POST", usuario),
     criarAluguel: (aluguel: any) => fetchData("alugueis", "POST", aluguel),
};
