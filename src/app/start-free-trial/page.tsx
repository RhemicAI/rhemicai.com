import { redirect } from 'next/navigation';

export default function StartFreeTrialRedirect() {
  redirect('/contact');
}
