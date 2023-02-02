import Swal from 'sweetalert2';

export const showSuccessAlert = () =>
  Swal.fire({
    icon: 'success',
    title: 'Data has been saved',
    showConfirmButton: false,
    timer: 4000,
  });

export const showFailAlert = (msg: string) =>
  Swal.fire({
    icon: 'error',
    title: 'Data has not been saved',
    text: msg,
    showConfirmButton: false,
    timer: 4000,
  });