import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:8000/';
//const BASE_URL = "http://127.0.0.1:8000/"; // <--- troque para seu IP local ou 10.0.2.2 em emulador Android
//https://marti-dittographic-undistractingly.ngrok-free.dev/

const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
        console.error('Error retrieving data:', e);
    }
    return null;
};

async function fetchJson(url, options = {}) {
    const accessToken = await retrieveData('KEY');

    const defaultHeader = {
        'Content-Type': 'application/json',
    };

    if (accessToken) {
        defaultHeader['Authorization'] = `Bearer ${accessToken}`;
    }

    const finalHeaders = {
        ...defaultHeader,
        ...(options.headers || {}),
    };

    console.log(`[API] Requisitando ${url}`);
    console.log(`[API] Token usado: ${accessToken}`);

    const res = await fetch(`${BASE_URL}${url}`, {
        headers: finalHeaders,
        ...options,
    });
    const text = await res.text();
    try {
        return {
            ok: res.ok,
            status: res.status,
            body: text ? JSON.parse(text) : null,
        };
    } catch (err) {
        console.error('Erro ao parsear JSON:', err);
        return { ok: res.ok, status: res.status, body: text };
    }
}

export const getTurmas = async () => {
    //console.log(await retrieveData("KEY"));
    return fetchJson('minhas-turmas/');
};

export const getMinhasOcorrencias = async () => {
    return fetchJson('minhas-ocorrencias/');
};

export const getEstudantes = async (id) => {
    return fetchJson(`/turmas/${id}/estudantes/`);
};

export const getDependencias = async () => {
    return fetchJson(`/dependencias/`);
};

export const getSituacoes = async () => {
    return fetchJson(`/situacoes`);
};

export const getOcorrencias = async () => {
    return fetchJson(`/ocorrencias`);
};

export const getOcorrenciaPorId = async (id) => {
    return fetchJson(`/ocorrencia${id}`);
};

export const createOcorrencia = async (payload) => {
    return fetchJson('/ocorrencias/novo', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const getOcorrenciasProfessor = async (id) => {
    return fetchJson(`/ocorrencias/${id}/professor`);
};

export const fazerLogin = async (payload) => {
    return fetchJson('/auth/token/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};
