import { toast } from "react-hot-toast";

export default async function subscribe(subscription: boolean | undefined) {
    if (subscription !== undefined) {
        if (!subscription) {
            const SubscriptionToast = toast.loading('Subscribing to Consistency');

            const res = await fetch('/api/subscribe')
            const data = await res.json()

            toast.success('Congratulations 🎉', {
                id: SubscriptionToast,
            });
        } else {
            const SubscriptionToast = toast.loading('Unsubscribing to Consistency');

            const res = await fetch('/api/subscribe')
            const data = await res.json()

            toast.success('Unsubscribed 😔', {
                id: SubscriptionToast,
            });
        }
    }
}