import Response from "../types/Response";

const linkBackEnd = process.env.REACT_APP_API_URL;

export const chamarBackEnd = async (metodo : string, caminho : string, corpo : any) : Promise<Response> => {

    const cabecalho = {
        "Content-Type": "application/json"
        }

    if(corpo){
        const response = await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: cabecalho,
            body: JSON.stringify(corpo),
            })
        return await response.json()
    }else{
        const response = await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: cabecalho,
            })
        return await response.json()
        }
  };