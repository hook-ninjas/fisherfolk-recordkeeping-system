import Swal from 'sweetalert2';

export const showSuccessAlert = () =>
  Swal.fire({
    icon: 'success',
    title: 'Data has been saved',
    showConfirmButton: false,
    timer: 4000,
  });

export const showFailAlert = () =>
  Swal.fire({
    icon: 'error',
    title: 'Data has not been saved',
    showConfirmButton: false,
    timer: 4000,
  });

export const showArchiveSuccess = () =>
  Swal.fire({
    icon: 'success',
    title: 'Record has been archived',
    showConfirmButton: false,
    timer: 4000,
  });

export const showArchiveError = () =>
  Swal.fire({
    icon: 'error',
    title: 'Record has not been archived',
    showConfirmButton: false,
    timer: 4000,
  });

export const showRemoveSuccess = () =>
  Swal.fire({
    icon: 'success',
    title: 'Gear has been removed',
    showConfirmButton: false,
    timer: 4000,
  });

export const showRemoveError = () =>
  Swal.fire({
    icon: 'error',
    title: 'Gear has not been removed',
    showConfirmButton: false,
    timer: 4000,
  });

export const showRestoreError = () =>
  Swal.fire({
    icon: 'error',
    title: 'Record has not been restored',
    showConfirmButton: false,
    timer: 4000,
  });

export const showRestoreSuccess = () =>
  Swal.fire({
    icon: 'success',
    title: 'Record has been restored',
    showConfirmButton: false,
    timer: 4000,
  });
