/**
 * Configurações da aplicação
 * @type {{
 * localStorageVuexId: string,
 * http: {requestBaseUrl: string, requestTimeout: number},
 * loginTitle: string,
 * appBarTitle: string
 * }}
 */
export const config = {
  loginTitle: 'Lakaza Marcenaria',
  appBarTitle: 'Lakaza',
  localStorageVuexId: 'lakaza_store',
  http: {
    requestTimeout: 60000,
    requestBaseUrl: '/api/',
  },
};
