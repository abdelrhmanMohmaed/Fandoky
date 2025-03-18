export function setData(response) {
    const result = response.data;

    sessionStorage.setItem('id', result.user.id);
    sessionStorage.setItem('accessToken', result.token);
    sessionStorage.setItem('userName', result.user.name);

    if (result.user.email_verified_at) {
        sessionStorage.setItem('verified', 'true');
      } else {
        sessionStorage.setItem('verified', 'false');
      }
}

export function removeData() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('verified');
}
