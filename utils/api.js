// src/api.js
const BASE_URL = "http://10.0.2.2:8000/"; // <--- troque para seu IP local ou 10.0.2.2 em emulador Android

async function fetchJson(url, options = {}) {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { "Content-Type": "application/json" },
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
    return fetchJson("/turmas/");
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