import { toast } from "react-hot-toast";

export default async function remove() {
    const DeleteToast = toast.loading('Deleting Account');

    const res = await fetch('/api/delete-account')
    const data = await res.json()

    toast.success('Account Deleted', {
        id: DeleteToast,
    });
}