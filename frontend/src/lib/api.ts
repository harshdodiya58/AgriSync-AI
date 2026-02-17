const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiOptions {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
}

export async function apiRequest(endpoint: string, options: ApiOptions = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const config: RequestInit = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// Auth endpoints
export const authAPI = {
    login: (email: string, password: string) =>
        apiRequest('/auth/login', { method: 'POST', body: { email, password } }),
    register: (name: string, email: string, password: string, role: string) =>
        apiRequest('/auth/register', { method: 'POST', body: { name, email, password, role } }),
    getMe: () => apiRequest('/auth/me'),
};

// Yield endpoints
export const yieldAPI = {
    predict: (data: any) =>
        apiRequest('/yield/predict', { method: 'POST', body: data }),
    getHistory: () => apiRequest('/yield/history'),
};

// Demand endpoints
export const demandAPI = {
    getForecast: (cropType?: string, region?: string, days?: number) => {
        const params = new URLSearchParams();
        if (cropType) params.append('cropType', cropType);
        if (region) params.append('region', region);
        if (days) params.append('days', days.toString());
        return apiRequest(`/demand/forecast?${params.toString()}`);
    },
};

// Sync endpoints
export const syncAPI = {
    compare: (data: any) =>
        apiRequest('/sync/compare', { method: 'POST', body: data }),
    getHistory: (cropType?: string, region?: string) => {
        const params = new URLSearchParams();
        if (cropType) params.append('cropType', cropType);
        if (region) params.append('region', region);
        return apiRequest(`/sync/history?${params.toString()}`);
    },
};

// Alert endpoints
export const alertAPI = {
    getAlerts: (type?: string, severity?: string) => {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (severity) params.append('severity', severity);
        return apiRequest(`/alerts?${params.toString()}`);
    },
    getStats: () => apiRequest('/alerts/stats'),
};

// Admin endpoints
export const adminAPI = {
    getAllUsers: (search?: string, role?: string, page?: number, limit?: number) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (role) params.append('role', role);
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        return apiRequest(`/admin/users?${params.toString()}`);
    },
    updateUserRole: (userId: string, role: string) =>
        apiRequest(`/admin/users/${userId}/role`, { method: 'PUT', body: { role } }),
    deleteUser: (userId: string) =>
        apiRequest(`/admin/users/${userId}`, { method: 'DELETE' }),
    getSystemStats: () => apiRequest('/admin/stats'),
};

