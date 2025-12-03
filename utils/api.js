// src/api.js
const BASE_URL = "http://marti-dittographic-undistractingly.ngrok-free.dev/"; // <--- troque para seu IP local ou 10.0.2.2 em emulador Android
import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // value previously stored
          return value;
        }
      } catch (e) {
        // error reading value
        console.error("Error retrieving data:", e);
      }
      return null;
};


async function fetchJson(url, options = {}) {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { 
            "Authorization": `Bearer ${await retrieveData("KEY")}`,
            "Content-Type": "application/json",
                    
         },
        ...options
    });
    const text = await res.text();
    try {
        return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : null };
    } catch (err) {
        return { ok: res.ok, status: res.status, body: text };
    }
}



export const getTurmas = async () =>{
    console.log(await retrieveData("KEY"));
    return fetchJson("/minhas-turmas/");
}

export const getEstudantes = async (id) => {
    return fetchJson(`/turmas/${id}/estudantes/`);
}

export const getDependencias = async () => {
    return fetchJson(`/dependencias/`);
}

export const getSituacoes = async () => {
    return fetchJson(`/situacoes`);
}

export const getOcorrencias = async () => {
    return fetchJson(`/ocorrencias`);
}

export const getOcorrenciaPorId = async (id) => {
    return fetchJson(`/ocorrencia${id}`);
}

export const createOcorrencia = async (payload) => {
    return fetchJson("/ocorrencias/novo", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export const getOcorrenciasProfessor = async (id) =>{
    return fetchJson(`/ocorrencias/${id}/professor`);
}

export const fazerLogin = async (payload) =>{
    return fetchJson("/auth/token/", {
        method: "POST",
        body: JSON.stringify(payload)
    })

}

/*
export const updateAluno = async (id, payload) => {
    return fetchJson(`/alunos/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

export const deleteAluno = async (id) => {
    return fetchJson(`/alunos/${id}`, { method: "DELETE" });
    
}
*/