import Swal from 'sweetalert2';
import './Modals.css'

export const showConfirmationDialog = async () => {
  const result = await Swal.fire({
    title: "Do you want to save the changes?",
    showCancelButton: true,
    confirmButtonText: "Save",
    customClass: {
      popup: 'confirm-changes-popup', 
    }
  });
  
  return result.isConfirmed;
};

export const confirmationDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure you want to delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    customClass: {
        popup: 'confirm-delete-popup', 
    }
  });
    return result.isConfirmed;
};

export const showSuccessErrorToast = (icon: "success" | "error" ,title: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'success-added-popup',
    }
  });
  
  Toast.fire({
    icon: icon,
    title: title
  });
};

export const confirmationErrorEmail = (errorMessage: string) => {
  Swal.fire({
    title: "Email already taken",
    text: errorMessage,
    icon: "error",
    customClass: {
      popup: 'popup-alert'
  }
  });
};

export const confirmationValidInput = () => {
  Swal.fire({
    title: "Enter valid input",
    customClass: {
      popup: 'popup-alert'
    }
  });
}

