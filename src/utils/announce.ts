import Swal from "sweetalert2";

export async function announce(title: string, text: string, icon: "info" | "success" = "info") {
  await Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Entendido",
    confirmButtonColor: "#b91c1c",
  });
}
