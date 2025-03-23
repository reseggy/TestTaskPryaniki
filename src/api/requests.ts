import apiClient from "./apiClient";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Произошла ошибка";
};

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post(
      "/ru/data/v3/testmethods/docs/login",
      {
        username,
        password,
      }
    );
    if (response.data.error_code !== 0) {
      throw new Error(response.data.error_text || "Ошибка авторизации");
    }
    const token = response.data.data.token;
    localStorage.setItem("authToken", token);
    return token;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error) || "Ошибка авторизации");
  }
};

export const getTableData = async () => {
  try {
    const response = await apiClient.get(
      "/ru/data/v3/testmethods/docs/userdocs/get"
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error) || "Ошибка получения данных");
  }
};

export const createRecord = async (record: {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}) => {
  try {
    const response = await apiClient.post(
      "/ru/data/v3/testmethods/docs/userdocs/create",
      record
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error) || "Ошибка создания записи");
  }
};

export const deleteRecord = async (id: string) => {
  try {
    const response = await apiClient.post(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error) || "Ошибка удаления записи");
  }
};

export const updateRecord = async (
  id: string,
  updatedRecord: {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  }
) => {
  try {
    const response = await apiClient.post(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}
  `,
      updatedRecord
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error) || "Ошибка редактирования записи");
  }
};
